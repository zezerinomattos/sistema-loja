import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../../components/Presentation';
import { Input } from '../../../../components/Ui/Input';

import { ModalAlert } from '../../../../components/Utils/ModalAlert';

import { canSSRAuth } from '../../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../../services/api';
import { api } from '../../../../services/apiClient';


type CategoryProps = {
    id: string;
    nome_categoria: string;
}

interface ListProps{
    category: CategoryProps[];
}


export default function ListCategory({ category }: ListProps){

    const [carregando, setCarregando] = useState(true);

    const [categorynList, setCategoryList] = useState(category || []);

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');

    const [modalVisibleAlert, setModalVibleAlert] = useState(false);
    const [alertIdOrder, setAlertIdOrder] = useState('');
    const [titleAlert, setTitleAlert] = useState('Excluir categoria');
    const [menssageAlert, setMenssageAlert] = useState('Deseja realmente DELETAR esse categoria???');

    //FUNCAO QUE ABRE MODAL DE ALERT
    function alertConfirm(id: string ){
        setAlertIdOrder(id);
        setModalVibleAlert(true);
    }

    // FUNCAO PARA DELETAR SECAO
    async function handleDelete(res: string, id: string){
        if(!id){
            toast.error('ALGO DEU ERRADO, ATUALIZE A PAGINA E TENTE NOVAMENTE');
            return;
        }

        if(res === 'sim'){
            await api.delete('/categoria', {
                params:{
                    categoria_id: id,
                }
            })
            .then(() => {
                toast.success('CATEGORIA DELETADA');
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                toast.error('ALGO DEU ERRADO, A CATEGORIA NÃO PODE SER EXCLUIDA SE ESTIVER EM UM PRODUTO!');
                setModalVibleAlert(false)
            })
        }else if(res === 'nao'){
            setModalVibleAlert(false)
            return
        }

    }

    // FUNCAO FILTRO 
    function filterFactory(){
        //FILTRANDO SE TEM ID
        if(listId){
            const filterSection = category.filter((cat) => cat.id.includes(listId));
            setCategoryList(filterSection);
        }

        //FILTRANDO PELO NOME
        if(!listId && listName){
            const filterSection = category.filter((cat) => cat.nome_categoria.includes(listName));
            setCategoryList(filterSection);
        }

        //FILTRANDO TODOS
        if(!listName && !listId){
            clearFilter();
        }
    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setCategoryList(category);
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


    return(
        <>
            <Head>

                <title>Sistema - list category</title>
            </Head>

            <div className={styles.container}>
                <Header title={'LISTA CATEGORIA'}/>

                <main className={styles.containerFavorit}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)} style={{width: '320px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <Input placeholder='CATEGORIA' value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())}/>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={filterFactory} className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>

                        <article className={styles.listContainer}>
                            <ol className={styles.list}>
                                {categorynList.map(cat => (
                                    <li key={cat.id}>
                                        <span className={styles.idDetail}>{cat.id}</span>
                                        <span className={styles.nameDetail}>{cat.nome_categoria}</span>
                                        <BsTrash 
                                            size={20} 
                                            style={{color: '#FF3F4B', cursor: 'pointer'}}
                                            onClick={() => alertConfirm(cat.id)}
                                        />           
                                    </li>
                                ))}
                            </ol>
                        </article>
                        
                    </div>
                </main>

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

export const getServerSideProps = canSSRAuth(async(ctx) => {

    //@ts-ignore
    const apiCategory = setupAPIClient(ctx);
    const response = await apiCategory.get('categoria');
    
    return{
        props:{
            category: response.data
        }
    }
})

