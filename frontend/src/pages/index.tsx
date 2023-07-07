import Head from 'next/head';
import Image from 'next/image';

// MY IMPORTS
import styles from '@/styles/Home.module.scss';
import logoImg from '../../public/Logo-united-sem-fundo.png';

import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

export default function Home() {
  return (
    <>
      <Head>

        <title>Sistema - faça seu login</title>
      </Head>
      <main className={styles.container}>
        <Image src={logoImg} alt='Logo da empresa' />

        <div className={styles.logon}>
          <form>
            <Input placeholder='Digite seu email' type='text'/>
            <Input placeholder='Digite sua senha' type='password'/>

            <Button type='submit' loading={true} >ENTRAR</Button>
          </form>
        </div>       

      </main>
    </>
  );
}
