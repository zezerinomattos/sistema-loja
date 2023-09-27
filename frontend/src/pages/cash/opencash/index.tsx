import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import { FcMoneyTransfer } from "react-icons/fc";
import { toast } from 'react-toastify';

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import imgCaixa from '../../../../public/CashRegister.png';
import { Button } from '../../../components/Ui/Button';
import { Input, TextArea } from '../../../components/Ui/Input';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { api } from '../../../services/apiClient';

export default function OpenCash(){ 
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [colaborador_id, setColaborador_id] = useState(user.colaborador_id);
    const [obs, setObs] = useState('');
    const [value, setValue] = useState<number>();

    //FUNCAO PARA CANCELAR ABERTURA DE CAIXA
    function handleCancel(){
        toast.error('Abertura de caixa cancelada!');
        setTimeout(() => {
            router.push('/');
        }, 2000)
    }

    //FUNCAO PARA CRIAR O CAIXA
    async function handleOpen(){
        await api.post('/caixa', {
            colaborador_id: colaborador_id,
            obs: obs,
        })
        .then(() => {
            toast.success('Caixa aberto, você já pode trabalhar com ele.');
            setTimeout(() => {
                router.push('/');
            }, 2000)
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.erro);
        })
    }

    useEffect(() => {
        async function detailsCaixa(){
            await api.get('/detail/caixa', {
                params:{
                    colaborador_id: colaborador_id,
                }
            })
            .then(response => {
                setValue((response.data.valor_final.toFixed(2)));
            })
            .catch(error => {
                console.log(error);
                toast.warning(error.response.data.erro);
            });
        }

        detailsCaixa();

         //Escondendo o loading quando ele montar completamente o componente
         setCarregando(false);
    }, []);

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    return(
        <>
            <Head>
                <title>Sistema - Cash open</title>
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
                                    <span>SALDO ANTERIOR: R$</span>
                                    <div className={styles.input}>
                                        <Input type='text' value={value} disabled/>
                                        <FcMoneyTransfer size={32} />
                                    </div>

                                    <TextArea style={{width: '400px', height: '200px'}} onChange={(e) => setObs(e.target.value)} value={obs}/>

                                    <div className={styles.button}>
                                        <Button style={{width: '150px', height: '40px', marginLeft: '10px', backgroundColor: '#FF3F4B'}} type='button' loading={loading} onClick={handleCancel} >CANCELAR</Button>
                                        <Button style={{width: '150px', height: '60px', marginLeft: '1rem'}} type='button' loading={loading} onClick={handleOpen}>ABRIR</Button>
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