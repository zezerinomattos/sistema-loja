import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
//import { FiUpload } from 'react-icons/fi';
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

export default function dashboard({ representative }: ListProps){
    const { user } = useContext(AuthContext);
    
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const [empresa, setEmpresa] = useState('');
    const [contato, setContato] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [ie, setIe] = useState('');
    const [razaosocial, setRazaosocial] = useState('');

    const [representante_id, setRepresentante_id] = useState('');

    //FUNCAO PARA CRIAR REPRESENTANTE
    async function hadleRegister(event: FormEvent){
        event.preventDefault();

        try {
            //Verificações
            if( !empresa || !contato || !cnpj || !ie || !razaosocial || !representante_id){             
                setMessage('Preencha todos os campos!');
                return;
            }

            if(cnpj.length !== 18){
                setMessage("Informe um CNPJ valido");
            }

            setLoaging(true);

            await api.post('/fabrica', {
                empresa: empresa,
                contato: contato,
                cnpj: cnpj,
                ie: ie,
                razaosocial: razaosocial,
                representante_id: representante_id
            })
            .then(() => {
                toast.success('FABRICA CADASTRADA COM SUCESSO');
                setLoaging(false);

                setEmpresa('');
                setContato('');
                setCnpj('');
                setIe('');
                setRazaosocial('');
                setRepresentante_id('')
                setMessage('');
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

                <title>Sistema - new factory</title>
            </Head>
            <div className={styles.container}>
                <Header title={'NOVA FABRICA'}/>

                <main className={styles.containerBody}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <form className={styles.formFabrica} onSubmit={hadleRegister}>
                            <Input placeholder='EMPRESA' type='text' className={styles.inputName} onChange={(e) => setEmpresa(e.target.value)} value={empresa}/>

                            <div className={styles.inputsBasicData}>                               
                                <Input placeholder='CNPJ' type='text' style={{width: '400px'}} onChange={(e) => setCnpj(e.target.value)} value={cnpj}/>
                                <Input placeholder='INSCRIÇÃO ESTADUAL' type='text' onChange={(e) => setIe(e.target.value)} value={ie}/>
                                <Input placeholder='RAZÃO SOCIAL' style={{width: '400px'}} type='text' onChange={(e) => setRazaosocial(e.target.value)} value={razaosocial}/>

                                <Input placeholder='CONTATO' type='text' onChange={(e) => setContato(e.target.value)} value={contato}/>

                                <select 
                                    name="representative" 
                                    id="representative"
                                    onChange={(e) => setRepresentante_id(e.target.value)}
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