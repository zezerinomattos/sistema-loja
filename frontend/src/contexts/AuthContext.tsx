import React, { createContext, ReactNode, useState} from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { toast } from 'react-toastify';

import { api } from '@/services/apiClient';

type AuthContextData ={
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (Credential: SignInProps) => Promise<void>;
    signUp: (Credential: FormData) => Promise<void>;
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

type SignUpProps = {
    cpf: string;
    nome: string;
    nascimento: Date;
    sexo: string;
    email: string;
    file: File;
    cep: string;
    logradouro: string
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    pais: string;
    situacao: boolean;
    cargo: string;
    celular: string;
    telefone: string;
    rg: string;
    orgao_emissor: string; 
    carteira_trabalho: string;
    serie: string;
    pis: string;
    titulo_eleitor: string; 
    zona_eleitoral: string;
    secao_eleitoral: string;
    salario_base: number;
    complemento_salario: number;
    //quebra_caixa: number;
    //bonificacao: number 
    senha: string;
    obs: string;
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

    // FUNCAO PARA LOGA
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

            // ALERT DE SUCESSO
            toast.success('LOGADO COM SUCESSO');
        })
        .catch(error => {
            console.log(`ERRO AO ACESSAR, ${error}`);
        });
    }

    if(!user){
        return null;
    }

    // FUNCAO QUE CRIA COLABORADOR
    async function signUp(data: FormData){
        try {
            const response = await api.post('/colaborador', data);
            //console.log(response.data);
            toast.success('CADRASTRO REALIZADO COM SUCESSO');
        } catch (error: any) {
            // console.log(error.response.data.erro)
            // toast.error(`${error.response.data.erro}`)

            if (error.response && error.response.data && error.response.data.erro) {
                const errorMessage = error.response.data.erro;
                console.log(errorMessage);
                toast.error(errorMessage);
            } else {
                const errorMessage = 'Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.';
                console.log(error);
                toast.error(errorMessage);
            }
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}