import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

export default function CupomFiscal() {
    const router = useRouter();
    const id = router.query.id; // Acessando o parâmetro Id da URL
    const orderId = id?.toString();

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');



    useEffect(() => {
      //Escondendo o loading quando ele montar completamente o componente
      setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }
  
    return (
      <div className={styles.container}>
        <Header title={'CUPOM FISCAL'} id={orderId}/>

        <main className={styles.containerBody}>
            <Presentation />

            <div className={styles.rigthContainer}>
              <h1 style={{color: '#FFF'}}>{id}</h1>
            </div>
        </main>
      </div>
    );
}

