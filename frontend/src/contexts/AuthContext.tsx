import React, { createContext, ReactNode, useState} from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { api } from '@/services/apiClient';

type AuthContextData ={
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (Credential: SignInProps) => Promise<void>;
    signOut:() => void;
}

type UserProps ={
    id: string,
    nome: string;
    email: string;
}

type SignInProps = {
    email: string;
    senha: string;
}

type AuthProvaiderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

//FUNCAO PARA DESLOGAR
export function signOut(){
    try {
        destroyCookie(undefined, '@sistema.united')
        Router.push('/')
    } catch (error) {
        console.log('Erro ao deslogar: ' + error);
    }
}

export function AuthProvaider({ children }:  AuthProvaiderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const isAuthenticated = !!user;

    async function signIn({ email, senha}: SignInProps){
        await api.post('/login', {
            email,
            senha
        })
        .then(response => {
            const { id, nome, token } = response.data;

            setCookie(undefined, '@sistema.united', token, {
                maxAge: 60 * 60 * 24 * 30, //token inspira em um mes
                path: '/'
            })

            setUser({
                id,
                nome,
                email,
            })

            // Passando para as proximas requisições o mesmo token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            // Redirecionando usuário para pagina de dashboard
            Router.push('/dashboard')
        })
        .catch(error => {
            console.log(`ERRO AO ACESSAR, ${error}`);
        });
    }

    if(!user){
        return null;
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}