import React, { useContext, useEffect, useState  } from 'react';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';

import logoEmpresa from '../../../public/logo-Nanda.png';

import { AuthContext } from '../../contexts/AuthContext';
import { canSSRAuth } from '../../components/Utils/serverSideProps/canSSRAuth';

export default function dashboard(){
    const { user } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    return(
        <div className={styles.container}>
                <Header />

                <main className={styles.containerFavorit}>
                    <div className={styles.leftContainer}>
                        <div className={styles.logoEmpresa}>
                            <Image src={logoEmpresa} alt='Logo da empresa'  width={160} height={150}/>
                            <h5>ATENDIMENTO</h5>
                            <h3>09:00 AS 19:00</h3>
                        </div>

                        <div className={styles.dadosUser}>
                            {user.id && (
                                <div>
                                    <Image src={user.url + '/' + user.foto} alt='Logo da empresa' width={80} height={80} />
                                    <h3>{user.nome}</h3>
                                    <h5>{user.email}</h5>
                                    <h3>{user.cargo}</h3>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.rigthContainer}>
                        <h1>FAVORITOS</h1>
                        
                    </div>
                </main>
        </div>
    );
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
      props: {}
    }
  });