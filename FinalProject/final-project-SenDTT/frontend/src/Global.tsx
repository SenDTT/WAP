import { createContext, ReactNode, useEffect, useState } from "react";
import { getCategories, setAuthentication } from "./api";
import { Category } from '../src/types/policyTypes';

export interface IUser {
    id: number,
    email: string,
    username: string,
    fullname: string,
    createdAt: string,
    updatedAt: string,
}

export interface ContextType {
    user: IUser | null,
    token: string,
    categories: Pick<Category, "id" | "name">[],
    login: (user: IUser, enc_data: string, hash_data: string) => void,
    logout: () => void,
    isAuthenticated: () => boolean
}

const initial_state = {
    user: null,
    token: '',
    categories: []
};

export const Context = createContext<ContextType>({
    ...initial_state,
    login: () => { },
    logout: () => { },
    isAuthenticated: () => false,
});

export function Global({ children }: { children: ReactNode }) {
    const [state, setState] = useState<Pick<ContextType, "user" | "token" | "categories">>(initial_state);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('token') as string);
        if (data && data.user) {
            setState(() => data);
        }
        async function getAllCategories() {
            const { data } = await getCategories();
            const allCategories = [{ id: 0, name: 'All Categories' }];

            setState(prev => ({ ...prev, categories: [...allCategories, ...data] }));

            localStorage.setItem('categories', JSON.stringify([...allCategories, ...data]));
        }
        const dataCategories = JSON.parse(localStorage.getItem('categories') as string);
        if (dataCategories && Array.isArray(dataCategories)) {
            setState(prev => ({ ...prev, categories: dataCategories }));
        } else if (state.categories.length == 0) {
            getAllCategories();
        }

        setAuthentication();

    }, []);

    const login = (user: IUser | null, enc_data: string, hash_data: string) => {
        setState(prev => ({ ...prev, user, token: `${enc_data}.${hash_data}` }));
    }
    const logout = () => {
        localStorage.removeItem('token');
        setState(() => initial_state);
    }
    const isAuthenticated = () => {
        return state.user && state.user.id ? true : false;
    }
    return (
        <Context.Provider value={{
            user: state.user,
            token: state.token,
            categories: state.categories,
            login, logout, isAuthenticated
        }}>
            {children}
        </Context.Provider>
    )
}