import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '../../../components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input } from '../../../components/Ui/Input';
import { ModalCollaborator } from '../../../components/ModalCollaborator';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

type CollaboratorProps = {
    id: string;
    situacao: boolean;
    usuario: {
        id: string;
        nome: string;
    }
}

interface ListProps{
    collaborator: CollaboratorProps[];
}

export type CollaboratorDetailProps = {
    id: string;
    cpf: string;
    nome: string;
    nascimento: Date;
    sexo: string;
    email: string;
    foto: string;
    created_at: Date;
    updated_at: Date;
    endereco_id: string;
    colaborador: {
        id: string;
        situacao: string;
        cargo: string;
        celular: string;
        telefone: string;
        rg: string;
        orgao_emissor: string;
        carteira_trabalho: string;
        serie: string;
        pis: string;
        titulo_eleitor: string;
        zona_eleitoral: string;
        secao_eleitoral: string;
        salario_base: number;
        complemento_salario: number;
        bonificacao: number;
        total_vendas_mes: number;
        quebra_caixa: number;
        saldo_salario: number;
        data_admissao: Date;
        data_demisao: Date;
        created_at: Date;
        updated_at: Date;
        obs: string;
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

export default function ListCollaborator({ collaborator }: ListProps){
    const { user} = useContext(AuthContext);
    const router = useRouter();

    const [collaboratorList, setCollaboratorList] = useState(collaborator || []);

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');

    const [modalCollaborator, setModalCollaborator] = useState<CollaboratorDetailProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    //FUNCAO PARA DETALHAR COLABORADOR SELECIONADO
    async function handleOpenModalView(id: string){
        await api.get('/colaborador/detail', {
            params: {
                colaborador_id: id,
            }
        })
        .then(response => {
            setModalCollaborator(response.data);
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
            const filteredCollaborators = collaborator.filter((colab) => colab.id.includes(listId));
            setCollaboratorList(filteredCollaborators);
        }

        //FILTRANDO PELO NOME
        if(!listId && listName){
            const filteredCollaborators = collaborator.filter((colab) => colab.usuario.nome.includes(listName));
            setCollaboratorList(filteredCollaborators);
        }

        //FILTRANDO TODOS
        if(!listName && !listId){
            clearFilter();
        }
    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setCollaboratorList(collaborator);
        setListId('');
        setListName('');
    }

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        function authenticator(){
           if (user.cargo !== 'GERENTE' && user.cargo !== 'ADMIM') {
                toast.error('VOCÊ NÃO TEM AUTORIZAÇÃO!');
                router.push('/dashboard');
                return null; // Retorna null para não renderizar o restante do componente.
            }
        }
        authenticator();
        
        setCarregando(false);
    }, []);

    // ATUALIZAR O FILTRO À MEDIDA QUE DIGITA
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            filterCollaborator();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [listName]);

    if (carregando) {
        return (
            <div className={styles.loadingContainer}>
                <FaSpinner color="#FFF" size={46} className={styles.loading} />
            </div>
        );
    }

    Modal.setAppElement('#__next');

    return(
        <>
            <Head>

                <title>Sistema - list collaborator</title>
            </Head>

            <div className={styles.container}>
                <Header title={'LISTA DE COLABORADORES'}/>

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
                                {collaboratorList.map(colab => (
                                    <li key={colab.usuario.id}>
                                        <span style={{width: '320px'}}>{colab.id}</span>
                                        <span onClick={() => handleOpenModalView(colab.id)} className={styles.nameDetail}>{colab.usuario.nome}</span>
                                        <span style={{width: '52px'}}>{colab.situacao ? "ATIVO" : "INATIVO"}</span>           
                                    </li>
                                ))}
                            </ol>
                        </article>
                    </div>
                </main>

                {
                    modalVisible && modalCollaborator && modalCollaborator.length > 0 && (
                        <ModalCollaborator 
                            isOpen={modalVisible}
                            onRequestClose={handleCloseModal}
                            colaborador={modalCollaborator}
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
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('colaborador');

    //console.log(response.data)

    return{
        props: {
            collaborator: response.data
        }
    }
});
