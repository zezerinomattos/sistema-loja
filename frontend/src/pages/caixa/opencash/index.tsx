import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';
import { FcMoneyTransfer } from "react-icons/fc";


//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import imgCaixa from '../../../../public/CashRegister.png';
import { Button } from '../../../components/Ui/Button';
import { Input, TextArea } from '../../../components/Ui/Input';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

export default function OpenCash(){ 
    const { user } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    useEffect(() => {
        

        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    return(
        <>
            <Head>
                <title>Sistema - Cash box</title>
            </Head>

            <div className={styles.container}>
                    <Header title={'ABRIR CAIXA'}/>

                    <main className={styles.containerFavorit}>
                        <Presentation />

                        <div className={styles.rigthContainer}>
                            <div className={styles.cashContainer}>

                                <div className={styles.leftCash}>
                                    <span>{user.cargo}</span>
                                    <Image src={imgCaixa} alt='Imagem de caixa' width={200} height={250}/>
                                </div>
                                <div className={styles.rigthCash}>
                                    <span>VALOR: R$</span>
                                    <div className={styles.input}>
                                        <Input type='text'/>
                                        <FcMoneyTransfer size={32} />
                                    </div>

                                    <TextArea style={{width: '400px', height: '200px'}} />

                                    <div className={styles.button}>
                                        <Button style={{width: '150px', height: '40px', marginLeft: '10px', backgroundColor: '#FF3F4B'}} type='button' loading={loading}>CANCELAR</Button>
                                        <Button style={{width: '150px', height: '60px', marginLeft: '1rem'}} type='button' loading={loading}>ABRIR</Button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </main>
            </div>
        </>
    );

}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
      props: {}
    }
});