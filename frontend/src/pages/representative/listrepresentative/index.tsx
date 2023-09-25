import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';

import { Input } from '../../../components/Ui/Input';
import { ModalRepresentative } from '../../../components/ModalRepresentative';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

type RepresentativeProps = {
    id: string;
    empresa: string;
    status: boolean;
    usuario: {
        id: string;
        nome: string;
    }
}

interface ListProps{
    representative: RepresentativeProps[];
}

export type RepresentativeDetailProps = {
    id: string;
    cpf: string;
    nome: string;
    nascimento: Date;
    sexo: string;
    email: string;
    foto: string;
    created_at: Date;
    updated_at: Date;
    representante: {
        id: string;
        status: string;
        empresa: string;
        celular: string;
        telefone: string;
        created_at: Date;
        updated_at: Date;
        obs: string;
        usuario_id: string
    }
    endereco: {
        id: string;
        cep: string;
        logradouro: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        uf: string;
        pais: string;
        created_at: Date;
        updated_at: Date;
    }
}

export default function ListRepresentative({ representative }: ListProps){
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [representativetList, setRepresentativeList] = useState(representative || []);

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');

    const [modalRepresentative, setModalRepresentative] = useState<RepresentativeDetailProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    //FUNCAO PARA DETALHAR COLABORADOR SELECIONADO
    async function handleOpenModalView(id: string){
        await api.get('/representante/detail', {
            params: {
                representante_id: id,
            }
        })
        .then(response => {
            setModalRepresentative(response.data);
            setModalVisible(true);
        });
    }

    // FUNCAO FECHAR MODAL
    function handleCloseModal(){
        setModalVisible(false);
    }


    // FUNCAO FILTRO 
    function filterCollaborator(){
        //FILTRANDO SE TEM ID
        if(listId){
            const filterRepresentative = representative.filter((repre) => repre.id.includes(listId));
            setRepresentativeList(filterRepresentative);
        }

        //FILTRANDO PELO NOME
        if(!listId && listName){
            const filterRepresentative = representative.filter((repre) => repre.usuario.nome.includes(listName));
            setRepresentativeList(filterRepresentative);
        }

        //FILTRANDO TODOS
        if(!listName && !listId){
            clearFilter();
        }
    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setRepresentativeList(representative);
        setListId('');
        setListName('');
    }

    // ATUALIZAR O FILTRO À MEDIDA QUE DIGITA
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            filterCollaborator();
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

                <title>Sistema - list representative</title>
            </Head>

            <div className={styles.container}>
                <Header title={'LISTA REPRESENTANTE'}/>

                <main className={styles.containerFavorit}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)} style={{width: '320px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <Input placeholder='NOME' value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())}/>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={filterCollaborator} className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>

                        <article className={styles.listContainer}>
                            <ol className={styles.list}>
                                {representativetList.map(rep => (
                                    <li key={rep.id}>
                                        <span className={styles.idDetail}>{rep.id}</span>
                                        <span onClick={() => handleOpenModalView(rep.id)} className={styles.nameDetail}>{rep.usuario.nome}</span>
                                        <span>{rep.empresa}</span>
                                        <span style={{width: '52px'}}>{rep.status ? "ATIVO" : "INATIVO"}</span>           
                                    </li>
                                ))}
                            </ol>
                        </article>
                        
                    </div>
                </main>
                {
                    modalVisible && modalRepresentative&& modalRepresentative.length > 0 && (
                        <ModalRepresentative
                            isOpen={modalVisible}
                            onRequestClose={handleCloseModal}
                            representative={modalRepresentative}
                        />
                    )
                }
            </div>
        </>
    );
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    // @ts-ignore
    const  apiRepresentative = setupAPIClient(ctx);
    const response = await apiRepresentative.get('representante');

    //console.log(response.data);

    return{
        props: {
            representative: response.data
        }
    }
});