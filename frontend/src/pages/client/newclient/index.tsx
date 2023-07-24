import React, {useState, useEffect, useContext} from 'react';
import { FaSpinner } from 'react-icons/fa';

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

export default function NewClient(){
    const { user } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    return(
        <div className={styles.container}>
                <Header title={'FAVORITOS'}/>

                <main className={styles.containerBody}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        
                        
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