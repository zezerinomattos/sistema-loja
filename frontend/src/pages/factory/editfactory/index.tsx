import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
//import { FiUpload } from 'react-icons/fi';
import { FcSearch } from "react-icons/fc";
//import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

type RepresentativeProps = {
    id: string;
    usuario: {
        nome: string;
    }
}

interface ListProps{
    representative: RepresentativeProps[];
}

export default function EditFactory({ representative }: ListProps){
    const { user } = useContext(AuthContext);

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const [fabrica_id, setFabricaId] = useState('');
    const [ie, setIe] = useState('');
    const [contato, setContato] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [razaosocial, setRazaosocial] = useState('');
    const [representante_id, setRepresentanteId] = useState('');

    //FUNCAO PARA BUSCAR O REPRESENTANTE
    async function handleFilter(){
        if(!fabrica_id){
            setMessage('Iforme o código do da Fabrica!');
            return;
        }

        setLoaging(true);

        await api.get('/fabrica/detail', {
            params: {
                fabrica_id: fabrica_id,
            }
        })
        .then(response => {
            setEmpresa(response.data[0]?.empresa);
            setRazaosocial(response.data[0]?.razaosocial);
            setIe(response.data[0]?.ie);
            setContato(response.data[0]?.contato);
            setRepresentanteId(response.data[0]?.representante_id);

            setLoaging(false);
            setMessage('');
            
        })
        .catch(error => {
            console.log(error);
            toast.error('ID do cliente inválido');

            //LIMPANDO OS CAMPOS DO FORM
            setRepresentanteId('');
            
            setMessage('');

            setLoaging(false);
        })
    }

    //FUNCAO PARA EDITAR REPRESENTANTE
    async function hadleEdit(event: FormEvent){
        event.preventDefault();

        if(!fabrica_id){
            setMessage('Iforme o código do da Fabrica!');
            return;
        }

        try {
            //Verificações
            if( !empresa || !contato || !ie || !razaosocial || !representante_id){             
                setMessage('Preencha todos os campos!');
                return;
            }

            setLoaging(true);

            await api.put('/fabrica/edit', {
                fabrica_id: fabrica_id,
                empresa: empresa,
                contato: contato,
                ie: ie,
                razaosocial: razaosocial,
                representante_id: representante_id
            })
            .then(() => {
                setEmpresa('');
                setContato('');
                setIe('');
                setRazaosocial('');
                setRepresentanteId('');
                setFabricaId('');

                setMessage('');
                toast.success('FABRICA EDITADA COM SUCESSO');
                setLoaging(false);
            })

        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.erro);
            setLoaging(false);
            setMessage('');
        }
    }

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

                <title>Sistema - edit factory</title>
            </Head>
            <div className={styles.container}>
                <Header title={'EDITAR FABRICAS'}/>

                <main className={styles.containerBody}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={fabrica_id} onChange={(e) => setFabricaId(e.target.value)} style={{width:'350px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={handleFilter} className={styles.buttonBuscar}>{loading ? <FaSpinner /> : 'BUSCAR'} <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>

                        <form className={styles.formFabrica} onSubmit={hadleEdit}>
                            <Input placeholder='EMPRESA' type='text' className={styles.inputName} onChange={(e) => setEmpresa(e.target.value)} value={empresa}/>

                            <div className={styles.inputsBasicData}>                               
                                <Input placeholder='INSCRIÇÃO ESTADUAL' type='text' onChange={(e) => setIe(e.target.value)} value={ie}/>
                                <Input placeholder='RAZÃO SOCIAL' style={{width: '400px'}} type='text' onChange={(e) => setRazaosocial(e.target.value)} value={razaosocial}/>

                                <Input placeholder='CONTATO' type='text' onChange={(e) => setContato(e.target.value)} value={contato}/>

                                <select 
                                    name="representative" 
                                    id="representative"
                                    onChange={(e) => setRepresentanteId(e.target.value)}
                                    value={representante_id}
                                    className={styles.selectInput}
                                >
                                    <option value="" disabled>REPRESENTANTE</option>
                                    {representative.map((rep) => (
                                        <option key={rep.id} value={rep.id}>{rep.usuario.nome}</option>
                                    ))}
                                </select>
                                
                            </div>

                            <div className={styles.buttonForm}>
                                <Button type='submit' loading={loading} style={{width: '100%', height: '40px'}} >CADASTRAR</Button>
                            </div>
                        </form>
                        {message && <span>{message}</span>}
                        
                    </div>
                </main>
            </div>
        </>
    );
    
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    // @ts-ignore
    const apiRepresentative = setupAPIClient(ctx);
    const response = await apiRepresentative.get('representante');

    return{
    props: {
        representative: response.data
    }
    }
});