import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import { FcMoneyTransfer } from "react-icons/fc";
import { toast } from 'react-toastify';
import { FcSearch } from "react-icons/fc";
import Modal from 'react-modal';

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
    const [nomeCaixaQuebra, setNomeCaixaQuebra] = useState('');

    // const [quebraCaixaList, setQuebraCaixaList] = useState(quebraCaixa || []);
    const [quebraCaixaList, setQuebraCaixaList] = useState<QuebraCaixaProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    //FUNCAO PARA CANCELAR QUEBRA DE CAIXA
    function handleCancel(){
        toast.error('Quebra de caixa cancelada!');
        setTimeout(() => {
            router.push('/cash/closedcash');
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
    function handleCloseModal(quebraCaixaId: string, nomeCaixa: string){
        setQuebraCaixa_id(quebraCaixaId);
        setNomeCaixaQuebra(nomeCaixa);

        setModalVisible(false);
    }

    //FUNCAO PARA CRIAR O QUEBRA DE CAIXA
    async function handleOpen(){
        await api.put('/edit/quebra/caixa', {
            quebraCaixa_id: quebraCaixa_id,
            motivo_reversao: motivo
        })
        .then(response => {
            toast.success(`Foi aprovado a reversão do caixa de ${nomeCaixaQuebra}`);
            setTimeout(() => {
                router.push('/');
            }, 2000)
        })
        .catch(error => {
            toast.error(error.response.data.erro);
            console.log(error);
        });
    }

    //CARREGANDO O ID DO CAIXA DINAMICAMENTE
    useEffect(() => {

        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, []);

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    Modal.setAppElement('#__next');

    return(
        <>
            <Head>
                <title>Sistema - Edit Cash Shortage</title>
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
                                            <Input type='text' style={{maxWidth: '150px'}} value={quebraCaixa_id} onChange={(e) => setQuebraCaixa_id(e.target.value)}/>
                                            <Input type='text' style={{width: '230px'}} value={nomeCaixaQuebra}/>
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

//Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async(ctx) => {

    return{
        props: {},
    }
});