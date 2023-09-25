import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';

import { Input } from '../../../components/Ui/Input';
import { ModalFactory } from '../../../components/ModalFactory';
import { ModalAlert } from '../../../components/Utils/ModalAlert';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';
import { type } from 'os';

type FactoryProps = {
    id: string;
    empresa: string;
    representante: {
        usuario: {
            nome: string;
        }
    }
}

interface ListProps{
    factory: FactoryProps[];
}

export type FactoryDetailProps = {
    id: string;
    empresa: string;
    cnpj: string;
    ie: string;
    contato: string;
    razaosocial: string;
    representante_id: string;
    representante:{
        usuario:{
            nome: string;
        };
        celular: string;
        telefone: string;
    };
    created_at: Date;
    updated_at: Date;
}

export default function ListFactory({ factory }: ListProps){
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [FactoryList, setFactoryList] = useState(factory || []);

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');

    const [modalFactory, setModalFactory] = useState<FactoryDetailProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    const [modalVisibleAlert, setModalVibleAlert] = useState(false);
    const [alertIdOrder, setAlertIdOrder] = useState('');
    const [titleAlert, setTitleAlert] = useState('Excluir fabrica');
    const [menssageAlert, setMenssageAlert] = useState('Deseja realmente DELETAR esse fabrica???');

    //FUNCAO PARA DETALHAR FABRICA SELECIONADO
    async function handleOpenModalView(id: string){
        await api.get('/fabrica/detail', {
            params: {
                fabrica_id: id,
            }
        })
        .then(response => {
            setModalFactory(response.data);
            setModalVisible(true);
        });
    }

    //FUNCAO QUE ABRE MODAL DE ALERT
    function alertConfirm(id: string ){
        setAlertIdOrder(id);
        setModalVibleAlert(true);
    }

    // FUNCAO PARA DELETAR FABRICA
    async function handleDelete(res: string, id: string){
        if(!id){
            toast.success('ALGO DEU ERRADO, ATUALIZE A PAGINA E TENTE NOVAMENTE');
            return;
        }

        if(res === 'sim'){
            // O usuário confirmou a exclusão, então faz a requisição para deletar a fábrica
            await api.delete('fabrica/delete', {
                params:{
                    fabrica_id: id,
                }
            })
            .then(() => {
                toast.success('FABRICA DELETADA');
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                toast.error('ALGO DEU ERRADO, A FABRICA NÃO PODE SER EXCLUIDA SE ESTIVER EM UM PRODUTO!');
                setModalVibleAlert(false)
            });
        }else if(res === 'nao'){
            setModalVibleAlert(false)
            return
        }
    }

    // FUNCAO FECHAR MODAL
    function handleCloseModal(){
        setModalVisible(false);
    }

    // FUNCAO FILTRO 
    function filterFactory(){
        //FILTRANDO SE TEM ID
        if(listId){
            const filterFactory = factory.filter((fac) => fac.id.includes(listId));
            setFactoryList(filterFactory);
        }

        //FILTRANDO PELO NOME
        if(!listId && listName){
            const filterFactory = factory.filter((fac) => fac.empresa.includes(listName));
            setFactoryList(filterFactory);
        }

        //FILTRANDO TODOS
        if(!listName && !listId){
            clearFilter();
        }
    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setFactoryList(factory);
        setListId('');
        setListName('');
    }

    // ATUALIZAR O FILTRO À MEDIDA QUE DIGITA
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            filterFactory();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [listName]);

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    Modal.setAppElement('#__next');

    return(
        <>
            <Head>

                <title>Sistema - list factory</title>
            </Head>

            <div className={styles.container}>
                <Header title={'LISTA FABRICAS'}/>

                <main className={styles.containerFavorit}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)} style={{width: '320px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <Input placeholder='EMPRESA' value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())}/>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={filterFactory} className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>

                        <article className={styles.listContainer}>
                            <ol className={styles.list}>
                                {FactoryList.map(fac => (
                                    <li key={fac.id}>
                                        <span className={styles.idDetail}>{fac.id}</span>
                                        <span onClick={() => handleOpenModalView(fac.id)} className={styles.nameDetail}>{fac.empresa}</span>
                                        <span>{fac.representante.usuario.nome}</span>
                                        <BsTrash 
                                            size={20} 
                                            style={{color: '#FF3F4B', cursor: 'pointer'}}
                                            onClick={() => alertConfirm(fac.id)}
                                        />           
                                    </li>
                                ))}
                            </ol>
                        </article>
                        
                    </div>
                </main>
                {
                    modalVisible && modalFactory && modalFactory.length > 0 && (
                        <ModalFactory
                            isOpen={modalVisible}
                            onRequestClose={handleCloseModal}
                            factory={modalFactory}
                        />
                    )
                }

                {
                    modalVisibleAlert && (
                        <ModalAlert 
                            isOpen={modalVisibleAlert}
                            onRequestClose={handleDelete}
                            idOrder={alertIdOrder}
                            titleAlert={titleAlert}
                            menssageAlert={menssageAlert}
                        />
                    )
                }
            </div>
        </>
    );
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    //@ts-ignore
    const apiFactory = setupAPIClient(ctx);
    const response = await apiFactory.get('fabrica');

    return{
        props: {
            factory: response.data
        }
    }
})