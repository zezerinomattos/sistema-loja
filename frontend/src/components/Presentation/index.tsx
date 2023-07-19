import React, { useContext, useEffect, useState  } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// MY IMPORTS
import styles from './styles.module.scss';

import logoEmpresa from '../../../public/logo-Nanda.png';

import { AuthContext } from '../../contexts/AuthContext';

export function Presentation(){
    const { user } = useContext(AuthContext);

    return(
        <div className={styles.leftContainer}>
            <div className={styles.logoEmpresa}>
                <Link href='/dashboard' >
                    <Image src={logoEmpresa} alt='Logo da empresa'  width={160} height={150}/>
                </Link>
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
    );
}