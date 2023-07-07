import React, { useContext, FormEvent, useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';

// MY IMPORTS
import styles from '@/styles/Home.module.scss';
import { AuthContext } from '@/contexts/AuthContext';

import logoImg from '../../public/Logo-united-sem-fundo.png';

import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoaging] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      email,
      password,
    }

    await signIn(data);
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
            <Input placeholder='Digite seu email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder='Digite sua senha' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

            <Button type='submit' loading={false} >ENTRAR</Button>
          </form>

        </div>       

      </main>
    </>
  );
}
