import axios from "axios";

const instanceAxios = axios.create({
    baseURL: 'http://localhost:3000',
});

export const postLogin = async (body: { email: string }) => {
    return await instanceAxios.post('/login', body).then(res => {
        localStorage.setItem('token', `${res.data.enc_data}.${res.data.hash_data}`);
        instanceAxios.defaults.headers.common['authentication'] = `${res.data.enc_data}.${res.data.hash_data}`;
        return res;
    });
}

export const postSignup = async (body: { email: string, fullname: string }) => {
    return await instanceAxios.post('/signup', body).then(res => {
        return res;
    });
}

export const getSecretData = async () => {
    return await instanceAxios.get('/users').then(res => {
        return res;
    });
}