import axios, { AxiosError} from "axios";
import { parseCookies } from 'nookies';

import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333/',
        //baseURL: 'http://192.168.3.4:3333/',
        headers: {
            Authorization: `Bearer ${cookies['@sistemaunited']}`
        }
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response?.status === 401){
            //Qualquer erro 401 devemos deslogar o usuário
            if(typeof window !== undefined){
                //chamar a função para deslogar usuário
                signOut();
            }else{
                return Promise.reject(new AuthTokenError());
            }
        }
        return Promise.reject(error);
    });

    return api;
}