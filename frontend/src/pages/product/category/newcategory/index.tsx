import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { AuthContext } from '../../../../contexts/AuthContext';
import { canSSRAuth } from '../../../../components/Utils/serverSideProps/canSSRAuth';

import { api } from '../../../../services/apiClient';

export default function NewCategory(){
    const { user } = useContext(AuthContext);

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const [nome_categoria, setNomeCategoria] = useState('');

    //FUNCAO PARA CRIAR REPRESENTANTE
    async function hadleRegister(event: FormEvent){
        event.preventDefault();

        try {
            if(!nome_categoria){
                setMessage('Preencha todos os campos!');
                return;
            }

            await api.post('/categoria', {
                nome_categoria: nome_categoria,
            })
            .then(() => {
                toast.success('CATEGORIA CADASTRADA COM SUCESSO');
                setLoaging(false);
                setNomeCategoria('');
                setMessage('');
            });
            
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.erro);
            setLoaging(false);
            setMessage('');
            setNomeCategoria('');
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

                <title>Sistema - new category</title>
            </Head>

            <div className={styles.container}>
                <Header title={'NOVA CATEGORIA'}/>

                <main className={styles.containerBody}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <form className={styles.formCategoria} onSubmit={hadleRegister}>
                            <div className={styles.inputContainer}>
                                <label className={styles.labelInput} htmlFor="secao">CATEGORIA</label>
                                <Input id='secao' placeholder='EX: Vestidos' type='text' className={styles.inputName} onChange={(e) => setNomeCategoria(e.target.value)} value={nome_categoria}/>
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
export const getServerSideProps = canSSRAuth(async(ctx) => {

    return{
        props: {}
    }
});


