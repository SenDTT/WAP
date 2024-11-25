import axios from "axios";
import { GetParams } from "./types/commonTypes";
import { AddPolicyForm } from "./types/policyTypes";

const instanceAxios = axios.create({
    baseURL: API_ENDPOINT,
});

export const setAuthentication = () => {
    if (localStorage.getItem('token') != null) {
        const data = JSON.parse(localStorage.getItem('token') as string);
        instanceAxios.defaults.headers.common['authentication'] = `${data.enc_data}.${data.hash_data}`;
    }
}

export const postLogin = async (body: { email: string, password: string }) => {
    return await instanceAxios.post('/auth/login', body).then(res => {
        localStorage.setItem('token', JSON.stringify(res.data.data));
        instanceAxios.defaults.headers.common['authentication'] = `${res.data.data.enc_data}.${res.data.data.hash_data}`;
        return res.data.data;
    });
}

export const postSignup = async (body: { email: string, fullname: string, password: string }) => {
    return await instanceAxios.post('/auth/signup', body).then(res => {
        return res.data;
    }).catch(err => {
        throw new Error(err.response.data.message);
    });
}

export const getPolicies = async (params: GetParams) => {
    return await instanceAxios.get(`/policies/?limit=${params.limit}&offset=${params.offset}${params.search != '' ? '&search=' + params.search : ''}${params.category != 0 ? '&category=' + params.category : ''}${params.year != 0 ? '&year=' + params.year : ''}`)
        .then(res => {
            return res.data;
        });
}

export const getPolicy = async (id: number) => {
    return await instanceAxios.get(`/policies/${id}`)
        .then(res => {
            return res.data;
        });
}

export const addPolicy = async ({ body }: { body: AddPolicyForm}) => {
    return await instanceAxios.post(`/policies`, body)
        .then(res => {
            return res.data;
        });
}

export const votePolicyOrReply = async (params: { type: 'policy' | 'reply', associate_id: number, user_id: number }) => {
    return await instanceAxios.post('/votes', params)
        .then(res => {
            return res.data;
        })
}

export const deleteVote = async (params: { type: 'policy' | 'reply', associate_id: number, user_id: number }) => {
    return await instanceAxios.delete(`/votes/${params.type}/${params.associate_id}/${params.user_id}`)
        .then(res => {
            return res.data;
        })
}

export const getCategories = async () => {
    return await instanceAxios.get('/categories').then(res => res.data);
}