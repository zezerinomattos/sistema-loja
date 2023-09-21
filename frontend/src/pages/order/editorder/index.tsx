import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
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

export default function EditOrder(){
    const { user } = useContext(AuthContext);
    
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const [order_id, setOrderId] = useState('');
    const [desconto, setDesconto] = useState(0);
    const [caixa_id, setCaixa_id] = useState('');
    const [clieteName, setClieteName] = useState('');
    const [vendedorName, setVendedorName] = useState('');

    //const [caixaList, setCaixaList] = useState(caixa || []);

    //FUNCAO PARA EDITAR ORDER
    async function hadleRegister(event: FormEvent){
        alert('ok');
    }

    //FUNCAO PARA BUSCAR O ORDER
    async function handleFilter(){
        alert('filter')
    }

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    return(
        <div className={styles.container}>
            <Header title={'NOVA FABRICA'}/>

            <main className={styles.containerBody}>
                <Presentation />

                <div className={styles.rigthContainer}>
                    <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <Input placeholder='CÓDIGO' value={order_id} onChange={(e) => setOrderId(e.target.value)} style={{width:'350px'}}/>
                        </div>

                        <div className={styles.filter}>
                            <button onClick={handleFilter} className={styles.buttonBuscar}>{loading ? <FaSpinner /> : 'BUSCAR'} <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                        </div>
                    </div>

                    <form className={styles.formOrder} onSubmit={hadleRegister}>
                        <div className={styles.inputData}>
                            <Input placeholder='NOME CLIENTE' type='text' className={styles.inputName} value={clieteName}/>
                            <Input placeholder='NOME VENDEDOR' type='text' className={styles.inputName} value={vendedorName}/>
                        </div>

                        <div className={styles.inputDataEdit}>
                            <Input placeholder='NOME CLIENTE' type='text' className={styles.inputName} value={clieteName}/>
                            <Input placeholder='NOME CLIENTE' type='text' className={styles.inputName} value={clieteName}/>
                            {/* <Input placeholder='NOME CLIENTE' type='text' className={styles.inputName} value={clieteName}/> */}
                            <div className={styles.filter}>
                                <select 
                                    name="product" 
                                    id="product"
                                    value={''} 
                                    // onChange={(e) => setSelectedFilter(e.target.value)}
                                    className={styles.selectInput}
                                >
                                    <option value="CLIENTE">CLIENTE</option>
                                    <option value="CAIXA">CAIXA</option>
                                </select>

                                <Button  type='button' ><FcSearch  size={28}/></Button>
                            </div> 
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}