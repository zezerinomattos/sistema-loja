import React, { useContext, useEffect, useState  } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '../../../components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input } from '../../../components/Ui/Input';

import logoEmpresa from '../../../../public/logo-Nanda.png';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../services/api';

type CollaboratorProps = {
    situacao: boolean;
    usuario: {
        id: string;
        nome: string;
    }
}

interface ListProps{
    collaborator: CollaboratorProps[];
}

type CollaboratorIDProps ={
    id: string;
}

export default function ListCollaborator({ collaborator }: ListProps){
    const { user} = useContext(AuthContext);

    const [collaboratorList, setCollaboratorList] = useState(collaborator || []);

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');

    // FUNCAO FILTRO 
    function filterCollaborator(){
        //FILTRANDO SE TEM ID
        if(listId){
            const filteredCollaborators = collaborator.filter((colab) => colab.usuario.id.includes(listId));
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

    // ATUALIZAR O FILTRO À MEDIDA QUE DIGITA
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            filterCollaborator();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [listName]);

    return(
        <div className={styles.container}>
            <Header title={'LISTA DE CLIENTES'}/>

            <main className={styles.containerFavorit}>
                <Presentation />

                <div className={styles.rigthContainer}>
                    <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)}/>
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
                                    <span>{colab.usuario.id}</span>
                                    <span className={styles.nameDetail}>{colab.usuario.nome}</span>
                                    <span>{colab.situacao ? "ATIVO" : "INATIVO"}</span>           
                                </li>
                            ))}
                        </ol>
                    </article>
                </div>
            </main>
        </div>
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