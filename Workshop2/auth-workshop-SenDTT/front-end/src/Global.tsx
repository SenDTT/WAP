import { createContext, ReactNode, useState } from "react";

export interface ContextType {
    email: string,
    enc_data: string,
    hash_data: string,
    login: (email: string, enc_data: string, hash_data: string) => void,
    logout: () => void,
    isAuthenticated: () => boolean
}

const initial_state = {
    email: '',
    enc_data: '',
    hash_data: ''
};

export const Context = createContext<ContextType>({
    email: '',
    enc_data: '',
    hash_data: '',
    login: () => { },
    logout: () => { },
    isAuthenticated: () => false,
});

export function Global({ children }: { children: ReactNode }) {
    const [state, setState] = useState(initial_state);
    const login = (email: string, enc_data: string, hash_data: string) => {
        setState(prev => ({ email, enc_data, hash_data }));
    }
    const logout = () => {
        localStorage.clear();
        setState(initial_state);
    }
    const isAuthenticated = () => {
        return state.email ? true : false;
    }
    return (
        <Context.Provider value={{
            email: state.email,
            enc_data: state.enc_data,
            hash_data: state.hash_data,
            login, logout, isAuthenticated
        }}>
            {children}
        </Context.Provider>
    )
}