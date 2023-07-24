import React, { createContext, ReactNode, useState, useEffect} from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { toast } from 'react-toastify';

import { api } from '../services/apiClient';

type AuthContextData ={
    user: UserProps;
    isAuthenticated: boolean;
    
    signIn: (Credential: SignInProps) => Promise<void>;
    signUp: (Credential: FormData) => Promise<void>;
    signOut:() => void;
    blockIn: (Credential: SignInProps) => Promise<boolean>;
    toEdit: (Credential: FormData) => Promise<void>;
    toEditPassaword: (Credential: ToEditPassawordProps) => Promise<void>;
}

type UserProps ={
    id: string,
    nome: string;
    email: string;
    cargo: string;
    foto: string;
    url: string;
    colaborador_id: string;
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

type ToEditPassawordProps = {
    colaborador_id: string;
    email: string;
    senha: string;
    newPassword: string;
}

export const AuthContext = createContext({} as AuthContextData)

//FUNCAO PARA DESLOGAR
export function signOut(){
    try {
        destroyCookie(undefined, '@sistemaunited')
        Router.push('/')
    } catch (error) {
        console.log('Erro ao deslogar: ' + error);
    }
}

export function AuthProvaider({ children }:  AuthProvaiderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const isAuthenticated = !!user;

    const [isBlock, setIsBlock] = useState(false);

    useEffect(() => {
        //Tentar pegar algo no cookie
        const { '@sistemaunited': token } = parseCookies();

        if(token){
            api.get('/me').then(response => {
                const { id, nome, email } = response.data;

                //console.log(response.data.nome, token);
                setUser({
                    id,
                    nome,
                    email,
                    cargo: response.data.colaborador[0].cargo,
                    foto: response.data.foto,
                    url: 'http://localhost:3333/files/',
                    colaborador_id: response.data.colaborador[0].id,
                });

                console.log(response.data.cargo)
            })
            .catch(() => {
                // Se erro deslogue o user
                signOut();
            });
        }

    }, [])

    // FUNCAO PARA LOGA
    async function signIn({ email, senha}: SignInProps){

        try {
            const response = await api.post('/login', {
                email,
                senha
            })
            //console.log(response.data);
            const { id, nome, token, cargo, foto, url } = response.data;

            setCookie(undefined, '@sistemaunited', token, {
                maxAge: 60 * 60 * 24 * 30, //O token expira em 1 mes
                path: "/" //Qualquer caminho era acesso a os cookies
            })

            setUser({
                id,
                nome,
                email,
                cargo,
                foto,
                url,
                colaborador_id: response.data.colaborador_id,
            })

            //PASSAR PARA PROXIMAS REQUISIÇÕES O NOSSO TOKEN
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            // Alerta personalizado.
            toast.success('LOGADO COM SUCESSO!');

            //REDIRECIONAR O USER PARA A PAGINA DE DASHBOARD (ULTIMOS PEDIDOS)
            Router.push('/dashboard');
            
        } catch (err) {
            toast.error('ERRO AO ACESSAR!');
            console.log('ERRO AO ACESSAR', err);
        }
    }

    // FUNCAO PARA DESBLOQUEAR
    async function blockIn({ email, senha }: SignInProps): Promise<boolean> {
        try {
          await api.post('/login', {
            email,
            senha,
          });     
          //toast.success('LOGADO COM SUCESSO!');
          return true; // Retorna true para indicar que o login foi bem-sucedido
          
        } catch (error) {
          console.log('ERRO AO ACESSAR', error);
      
          return false; // Retorna false para indicar que o login falhou
        }
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

            if (error.response && error.response.data && error.response.data.erro) {
                const errorMessage = error.response.data.erro;
                console.log(error);
                toast.error(errorMessage);
            } else {
                const errorMessage = 'Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.';
                console.log(error);
                toast.error(errorMessage);
            }
        }

    }

    // FUNCAO PARA EDITAR DADOS DO COLABORADOR
    async function toEdit(data: FormData){
        try {

            const response = await api.put('/colaborador/edit', data);
            //console.log(response.data);
            toast.success('CADRASTRO ATUALIZADO COM SUCESSO');

        } catch (error: any) {

            if (error.response && error.response.data && error.response.data.erro) {
                const errorMessage = error.response.data.erro;
                console.log(error);
                toast.error(errorMessage);
            } else {
                const errorMessage = 'Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.';
                console.log(error);
                toast.error(errorMessage);
            }
        }
    }

    // FUNCAO PARA EDITAR PASSWORD DO COLABORADOR
    async function toEditPassaword({ colaborador_id, email, senha, newPassword }: ToEditPassawordProps){
        try {
            //verificando se a senha antiga está correta
            await api.post('/login', {
              email,
              senha,
            })
            .then(async() => {
                // Alterando a senha
                await api.put('/colaborador/edit/pass', {
                    colaborador_id,
                    email,
                    senha: newPassword
                })
                .then(() => {
                    toast.success('SENHA ALTERADA COM SUCESSO');
                });
            })
            .catch(error => {
                toast.error('ALGO DEU ERRADO, VERIFIQUE E TENTE NOVAMENTE');
                console.log('ERRO AO ACESSAR', error);
            })   
            
          } catch (error) {
            console.log('ERRO AO ACESSAR', error);
          }
        
        
        
    }
 
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp, blockIn, toEdit, toEditPassaword }}>
            {children}
        </AuthContext.Provider>
    )
}