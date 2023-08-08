import React, { useContext, useEffect, useState  } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { useRouter } from 'next/router';

//MY IMPORTS
import styles from './style.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

export default function NewOrder(){
    const router = useRouter();
    
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [colaborado_id, setColaboradorId] = useState('');
    const [colaboradorName, setColaboradoName] = useState('');
    const [cliente_id, setClienteId] = useState('');
    const [clienteName, setClienteName] = useState('');
    const [caixa_id, setCaixaId] = useState('');
    const [caixaName, setCaixaName] = useState('');
    const [buttonFilter, setButtonFilter] = useState('');

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }


    return(
        <div className={styles.container}>
                <Header title={'NOVO PEDIDO'}/>

                <main className={styles.containerOrder}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={colaborado_id} onChange={(e) => setColaboradorId(e.target.value)} style={{width: '320px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <Input placeholder='COLABORADOR' value={colaboradorName} onChange={(e) => setColaboradoName(e.target.value.toUpperCase())} style={{width: '320px'}} disabled/>

                                <Button onClick={() => setButtonFilter('COLABORADOR')} type='button' ><FcSearch  size={28}/></Button>
                            </div>

                            
                        </div>

                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={cliente_id} onChange={(e) => setClienteId(e.target.value)} style={{width: '320px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <Input placeholder='CLIENTE' value={clienteName} onChange={(e) => setClienteName(e.target.value.toUpperCase())} style={{width: '320px'}} disabled/>

                                <Button onClick={() => setButtonFilter('CLIENTE')} type='button' ><FcSearch  size={28}/></Button>
                            </div>
                        </div>

                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={caixa_id} onChange={(e) => setCaixaId(e.target.value)} style={{width: '320px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <Input placeholder='CAIXA' value={caixaName} onChange={(e) => setCaixaName(e.target.value.toUpperCase())} style={{width: '320px'}} disabled/>

                                <Button onClick={() => setButtonFilter('CAIXA')} type='button' ><FcSearch  size={28}/></Button>
                            </div>
                        </div>

                        <Button type='submit' loading={loading}
                        style={
                            {width: '500px', 
                            height: '50px', 
                            marginTop: '2rem', 
                            fontSize: '20px'
                            }}>ABRIR PEDIDO</Button>
                        

                        <h1 style={{color: '#fff'}}>{buttonFilter}</h1>
                    </div>
                </main>
        </div>
    );
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
      props: {}
    }
});