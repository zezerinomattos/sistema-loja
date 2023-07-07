import React, { createContext, ReactNode, useState} from 'react';
import { destroyCookie } from 'nookies';
import Router from 'next/router';

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
    password: string;
}

type AuthProvaiderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

//FUNCAO PARA DESLOGAR
export function signOut(){
    try {
        destroyCookie(undefined, 'sistema.united')
        Router.push('/')
    } catch (error) {
        console.log('Erro ao deslogar: ' + error);
    }
}

export function AuthProvaider({ children }:  AuthProvaiderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const isAuthenticated = !!user;

    async function signIn({ email, password}: SignInProps){
        console.log(email);
        console.log(password);
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