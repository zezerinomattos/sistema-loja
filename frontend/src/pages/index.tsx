import React, { useContext, FormEvent, useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';

//import { GetServerSideProps } from 'next';
import { canSSRGuest } from '../components/Utils/serverSideProps/canSSRGuest';

// MY IMPORTS
import styles from '@/styles/Home.module.scss';
import { AuthContext } from '../contexts/AuthContext';

import logoImg from '../../public/Logo-united-sem-fundo.png';

import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoaging] = useState(false);
  const [message, setMessage] = useState('');

  // FUNCAO PARA LOGAR
  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(!email || !senha){
      setMessage('PREENCHA OS DADOS');
    }

    setLoaging(true);

    let data = {
      email,
      senha,
    }

    await signIn(data);

    setLoaging(false)
  }

  return (
    <>
      <Head>

        <title>Sistema - faça seu login</title>
      </Head>
      <main className={styles.container}>
        <Image src={logoImg} alt='Logo da empresa' />

        <div className={styles.login}>

          <form onSubmit={handleLogin}>
            <Input placeholder='Digite seu email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder='Digite sua senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}/>

            <Button type='submit' loading={loading} >ENTRAR</Button>
          </form>

          {message && <span>{message}</span>}

        </div>       

      </main>
    </>
  );
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRGuest(async (ctx) => {

  return{
    props: {}
  }
});
