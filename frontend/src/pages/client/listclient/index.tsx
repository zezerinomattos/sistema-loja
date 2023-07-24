import React, { useContext, useEffect, useState  } from 'react';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '../../../components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input } from '../../../components/Ui/Input';
import { ModalClient } from '../../../components/ModalClient';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

type ClientProps = {
    id: string;
    situacao: boolean;
    usuario: {
        id: string;
        nome: string;
    }
}

interface ListProps{
    client: ClientProps[];
}

export type ClientDetailProps = {
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
    cliente: {
        id: string;
        situacao: string;
        cargo: string;
        celular: string;
        telefone: string;
        rg: string;
        orgao_emissor: string;
        telefone_referencia1: string;
        nome_referencia1: string;
        telefone_referencia2: string;
        nome_referencia2: string;
        telefone_referencia3: string;
        nome_referencia3: string;
        profissao: string;
        empresa: string;
        renda_fixa: string;
        complemento_renda: string;
        score: string;
        limite_credito: number;
        ultima_compra: Date;
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

export default function ListClient({ client }: ListProps){
    const { user} = useContext(AuthContext);
    const router = useRouter();

    const [clientList, setClientList] = useState(client || []);

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [modalClient, setModalClient] = useState<ClientDetailProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    //FUNCAO PARA DETALHAR COLABORADOR SELECIONADO
    async function handleOpenModalView(id: string){
        await api.get('/cliente/detail', {
            params: {
                cliente_id: id,
            }
        })
        .then(response => {
            setModalClient(response.data);
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
            const filteredCollaborators = client.filter((colab) => colab.id.includes(listId));
            setClientList(filteredCollaborators);
        }

        //FILTRANDO PELO NOME
        if(!listId && listName){
            const filteredCollaborators = client.filter((colab) => colab.usuario.nome.includes(listName));
            setClientList(filteredCollaborators);
        }

        //FILTRANDO TODOS
        if(!listName && !listId){
            clearFilter();
        }
    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setClientList(client);
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
    }, [])

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
        <div className={styles.container}>
                <Header title={'LISTA DE CLIENTES'}/>

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
                                {clientList.map(colab => (
                                    <li key={colab.usuario.id}>
                                        <span>{colab.id}</span>
                                        <span onClick={() => handleOpenModalView(colab.id)} className={styles.nameDetail}>{colab.usuario.nome}</span>
                                        {/* <span className={styles.nameDetail}>{colab.usuario.nome}</span> */}
                                        <span>{colab.situacao ? "ATIVO" : "INATIVO"}</span>           
                                    </li>
                                ))}
                            </ol>
                        </article>
                        
                    </div>
                </main>

                {
                modalVisible && modalClient&& modalClient.length > 0 && (
                    <ModalClient 
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        client={modalClient}
                    />
                )
            }
        </div>
    )
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    // @ts-ignore
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('cliente');

    //console.log(response.data)

    return{
        props: {
            client: response.data
        }
    }
});