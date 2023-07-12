import React, { useContext  } from 'react';
import Image from 'next/image';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';

import logoEmpresa from '../../../public/logo-Nanda.png';

import { AuthContext } from '@/contexts/AuthContext';

export default function dashboard(){
    const { user } = useContext(AuthContext);

    const urlImage = 'http://localhost:3333/files/'

    return(
        <div className={styles.container}>
                <Header />

                <main className={styles.containerFavorit}>
                    <div className={styles.leftContainer}>
                        <div className={styles.logoEmpresa}>
                            <Image src={logoEmpresa} alt='Logo da empresa'  width={160} height={150}/>
                        </div>

                        <div className={styles.dadosUser}>
                            {user.foto && user.nome && user.email && user.cargo && user.url && user.id && (
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