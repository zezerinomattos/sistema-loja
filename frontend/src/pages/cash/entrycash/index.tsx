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

export default function EntryCash(){
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [caixa_id, setCaixa_id] = useState('');
    const [colaborador_id, setColaborador_id] = useState(user.colaborador_id);
    const [valor_entrada, setValor_entrada] = useState('');
    const [value, setValue] = useState<number>();
    const [motivo, setMotivo] = useState('');
    const [obs, setObs] = useState('');

    //FUNCAO PARA CANCELAR ENTRADA DE CAIXA
    function handleCancel(){
        toast.error('Entrada de caixa cancelada!');
        setTimeout(() => {
            router.push('/');
        }, 2000)
    }

    //FUNCAO PARA CRIAR ENTRADA DE CAIXA
    async function handleOpen(){
        await api.post('/entrada/caixa', {
            colaborador_id: colaborador_id,
            caixa_id: caixa_id,
            valor_entrada: valor_entrada,
            motivo: motivo,
            obs: obs
        })
        .then(response => {
            toast.success(`Foi inserido o valor de R$${valor_entrada} ao seu Caixa.`);
            setTimeout(() => {
                router.push('/');
            }, 2000);
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.erro);
        });
    }

    //Carrega o caixa
    useEffect(() => {
        async function detailsCaixa(){
            await api.get('/detail/closed/caixa', {
                params:{
                    colaborador_id: colaborador_id,
                }
            })
            .then(response => {
                setCaixa_id(response.data?.id);
                setValue(response.data?.saldo);              
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.erro);
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
                <title>Sistema - Cash entry</title>
            </Head>

            <div className={styles.container}>
                    <Header title={'ENTRADA NO CAIXA'}/>

                    <main className={styles.containerFavorit}>
                        <Presentation />

                        <div className={styles.rigthContainer}>
                            <div className={styles.cashContainer}>

                                <div className={styles.leftCash}>
                                    <span>{user.cargo}</span>
                                    <Image src={imgCaixa} alt='Imagem de caixa' width={200} height={250}/>
                                </div>
                                <div className={styles.rigthCash}>
                                    <span>SALDO:</span>
                                    <div className={styles.input}>
                                        <Input type='text' value={value} style={{width: '100px'}} disabled/>
                                        <Input type='text' value={valor_entrada} onChange={(e) => setValor_entrada(e.target.value)} style={{width: '100px'}} placeholder='R$ '/>
                                        <FcMoneyTransfer size={32} />
                                    </div>

                                    <TextArea style={{width: '400px', height: '80px'}} onChange={(e) => setMotivo(e.target.value)} value={motivo} placeholder='MOTIVO DA ENTRADA'/>

                                    <TextArea style={{width: '400px', height: '150px'}} onChange={(e) => setObs(e.target.value)} value={obs} placeholder='OBS - ANOTE AQUI QUALQUER OBSERVAÇÃO COMO EXEMPLO QUEM ENTREGOU O VALOR'/>

                                    <div className={styles.button}>
                                        <Button style={{width: '150px', height: '40px', marginLeft: '10px', backgroundColor: '#FF3F4B'}} type='button' loading={loading} onClick={handleCancel} >CANCELAR</Button>
                                        <Button style={{width: '150px', height: '60px', marginLeft: '1rem'}} type='button' loading={loading} onClick={handleOpen}>SALVAR</Button>
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
