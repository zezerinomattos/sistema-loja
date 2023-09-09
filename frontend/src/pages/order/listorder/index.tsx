import React, { useContext, useEffect, useState  } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';

import { Input } from '../../../components/Ui/Input';
import { ModalProduct } from '../../../components/ModalProduct';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

export default function ListOrder(){
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('PEDIDO');

    function filterOrder(){
        alert('ok button!');
    }


    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    Modal.setAppElement('#__next');

    return(
        <div className={styles.container}>
            <Header title={'LISTA DE PEDIDOS'}/>

            <main className={styles.containerFavorit}>
                <Presentation />

                <div className={styles.rigthContainer}>
                    <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)} style={{width: '300px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <Input placeholder={selectedFilter} value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())} style={{width: '250px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <select 
                                    name="product" 
                                    id="product"
                                    value={selectedFilter} 
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className={styles.selectInput}
                                >
                                    <option value="PEDIDO">PEDIDO</option>
                                    <option value="SECAO">SEÇÃO</option>
                                    <option value="CATEGORIA">CATEGORIA</option>
                                    <option value="REPRESENTANTE">REPRESENTANTE</option>
                                    <option value="FABRICA">FÁBRICA</option>
                                </select>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={filterOrder} className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                    </div>
                </div>
            </main>
        </div>
    )
}