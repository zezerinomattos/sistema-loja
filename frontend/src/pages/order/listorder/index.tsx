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
    const [selectedFilterOption, setSelectedFilterOption] = useState("TODOS");
    const [selectedFilter, setSelectedFilter] = useState('TODOS');

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

                            <div className={styles.inputRadioContainer}>
                                <div className={styles.filterRadio}>
                                    <input
                                    type="radio"
                                    name="filterOption"
                                    value="TODOS"
                                    checked={selectedFilterOption === "TODOS"}
                                    onChange={() => setSelectedFilterOption("TODOS")}
                                    />
                                    <label htmlFor="todos">TODOS</label>
                                </div>

                                <div className={styles.filterRadio}>
                                    <input
                                    type="radio"
                                    name="filterOption"
                                    value="FECHADOS"
                                    checked={selectedFilterOption === "FECHADOS"}
                                    onChange={() => setSelectedFilterOption("FECHADOS")}
                                    />
                                    <label htmlFor="fechados">FECHADOS</label>
                                </div>

                                <div className={styles.filterRadio}>
                                    <input
                                    type="radio"
                                    name="filterOption"
                                    value="RASCUNHOS"
                                    checked={selectedFilterOption === "RASCUNHOS"}
                                    onChange={() => setSelectedFilterOption("RASCUNHOS")}
                                    />
                                    <label htmlFor="rascunhos">RASCUNHOS</label>
                                </div>
                            </div>

                            <div className={styles.filter}>
                                <select 
                                    name="product" 
                                    id="product"
                                    value={selectedFilter} 
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className={styles.selectInput}
                                >
                                    <option value="TODOS">TODOS</option>
                                    <option value="VENDEDOR">VENDEDOR</option>
                                    <option value="CAIXA">CAIXA</option>
                                    <option value="CLIENTE">CLIENTE</option>
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