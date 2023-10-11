import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import { FcMoneyTransfer } from "react-icons/fc";
import { toast } from 'react-toastify';

import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import imgCaixa from '../../../../public/CashRegister.png';
import { Button } from '../../../components/Ui/Button';
import { Input, TextArea } from '../../../components/Ui/Input';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { api } from '../../../services/apiClient';

//MY IMPORTS
import styles from './styles.module.scss';

export default function CashreRister(){
    
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    return(
        <>
            <Head>
                <title>Sistema - Cash Register</title>
            </Head>

            <div className={styles.container}>
                <Header title={'REGISTRO DE PEDIDO NO CAIXA'}/>

                <main className={styles.containerFavorit}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        
                    </div>
                </main>
            </div>
        </>
    )
}