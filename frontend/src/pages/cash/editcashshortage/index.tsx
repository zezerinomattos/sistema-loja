import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import { FcMoneyTransfer } from "react-icons/fc";
import { toast } from 'react-toastify';
import { FcSearch } from "react-icons/fc";

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import imgCaixa from '../../../../public/CashRegister.png';
import { Button } from '../../../components/Ui/Button';
import { Input, TextArea } from '../../../components/Ui/Input';

import { ModalListCashShortage } from '../../../components/ModalLisCashShortage';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

export type QuebraCaixaProps ={
    id: string;
    data: Date;
    valor: number;
    diferenca: number;
    status: boolean;
    motivo: string;
    obs: string;
    caixa_id: string;
    colaborador_id: string;
    caixa:{
        colaborador: {
            usuario:{
                nome: string;
            };
        };
    };
}

export default function EditCashShortage(){
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [quebraCaixa_id, setQuebraCaixa_id] = useState('');
    const [motivo, setMotivo] = useState('');

    // const [quebraCaixaList, setQuebraCaixaList] = useState(quebraCaixa || []);
    const [quebraCaixaList, setQuebraCaixaList] = useState<QuebraCaixaProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    //FUNCAO PARA CANCELAR QUEBRA DE CAIXA
    function handleCancel(){
        toast.error('Quebra de caixa cancelada!');
        setTimeout(() => {
            router.push('/');
        }, 2000)
    }

    //FUNÇÃO ABRE MODAL
    async function handleOpenModal(){
        await api.get('/quebra/caixa').then(response => {
            setQuebraCaixaList(response.data.quebraCaixa);
            setModalVisible(true);
        })
        .catch(error => {
            console.log(error);
            alert(error)
        });
    }

    // FUNCAO FECHAR MODAL
    function handleCloseModal(){
        setModalVisible(false);
    }

    //FUNCAO PARA CRIAR O QUEBRA DE CAIXA
    async function handleOpen(){
        alert('edit quebra de caixa');
    }

    //CARREGANDO O ID DO CAIXA DINAMICAMENTE
    useEffect(() => {

        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, []);

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    return(
        <>
            <Head>
                <title>Sistema - Cash Shortage</title>
            </Head>

            <div className={styles.container}>
                <Header title={'REVERSÃO DE QUEBRA DE CAIXA'}/>

                <main className={styles.containerFavorit}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.rigthContainer}>
                                <div className={styles.cashContainer}>

                                    <div className={styles.leftCash}>
                                        <span>{user.cargo}</span>
                                        <Image src={imgCaixa} alt='Imagem de caixa' width={200} height={250}/>
                                    </div>
                                    <div className={styles.rigthCash}>
                                        <span>ID QUEBRA DE CAIXA:</span>
                                        <div className={styles.input}>
                                            <Input type='text' value={quebraCaixa_id} onChange={(e) => setQuebraCaixa_id(e.target.value)}/>
                                            <FcSearch size={32} className={styles.search} onClick={handleOpenModal}/>
                                        </div>

                                        <TextArea style={{width: '400px', height: '70px'}} onChange={(e) => setMotivo(e.target.value)} value={motivo} placeholder='MOTIVO DA REVERSÃO'/>

                                        <div className={styles.button}>
                                            <Button style={{width: '150px', height: '40px', marginLeft: '10px', backgroundColor: '#FF3F4B'}} type='button' loading={loading} onClick={handleCancel} >CANCELAR</Button>
                                            <Button style={{width: '150px', height: '60px', marginLeft: '1rem'}} type='button' loading={loading} onClick={handleOpen}>ABRIR</Button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                    </div>
                </main>

                {
                    modalVisible && (
                        <ModalListCashShortage 
                            isOpen={modalVisible}
                            onRequestClose={handleCloseModal}
                            listQuebraCaixa={quebraCaixaList}
                        />
                    )
                    
                }
            </div>
        </>
    )
}

// Verificando pelo lado do servidor
// export const getServerSideProps = canSSRAuth(async(ctx) => {

//     //@ts-ignore
//     const apiQuebraCaixa = setupAPIClient(ctx)
//     const response = await apiQuebraCaixa.get('quebra/caixa');

//     //console.log(response.data.quebraCaixa);

//     return{
//         props: {
//             quebraCaixa: response.data,
//         },
//     }
// });