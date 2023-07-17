import React, { useContext, useEffect, useState  } from 'react';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '../../../components/Header';
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

export default function ListCollaborator({ collaborator }: ListProps){
    const { user } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(true);

    const [collaboratorList, setCollaboratorList] = useState(collaborator || []);

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, []);

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    
    return(
        <div className={styles.container}>
            <Header />

            <main className={styles.containerFavorit}>
                <div className={styles.leftContainer}>
                    <div className={styles.logoEmpresa}>
                        <Image src={logoEmpresa} alt='Logo da empresa'  width={160} height={150}/>
                        <h5>ATENDIMENTO</h5>
                        <h3>09:00 AS 19:00</h3>
                    </div>

                    <div className={styles.dadosUser}>
                        {user.id && (
                            <div>
                                <Image src={user.url + '/' + user.foto} alt='Logo da empresa' width={80} height={80} />
                                <h3>{user.nome}</h3>
                                <h5>{user.email}</h5>
                                <h3>{user.cargo}</h3>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.rigthContainer}>
                    <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <Input placeholder='CÓDIGO'/>
                            <label><FcSearch size={28} /></label>
                        </div>

                        <div className={styles.filter}>
                            <Input placeholder='NOME'/>
                            <label><FcSearch size={28} /></label>
                        </div>

                        <div className={styles.filter}>
                            <Input placeholder='TODOS'/>
                            <label><FcSearch size={28} /></label>
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

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('colaborador');

    console.log(response.data)

    return{
        props: {
            collaborator: response.data
        }
    }
});