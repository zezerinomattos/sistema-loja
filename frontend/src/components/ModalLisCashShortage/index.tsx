import React, { useEffect, useState  } from 'react';
import Modal from 'react-modal';
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';

//MY IMPORTS
import styles from './styles.module.scss';
import { Input } from '../../components/Ui/Input';
import { QuebraCaixaProps } from '../../pages/cash/editcashshortage';

import { api } from '../../services/apiClient';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: (quebraCaixaId: string) => void;
    listQuebraCaixa: QuebraCaixaProps[];
}

export function ModalListCashShortage({ isOpen, onRequestClose, listQuebraCaixa }: ModalProps){
    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('PRODUTO');

    const customStyles = {
        content: {
          top: '50%',
          bottom: 'auto',
          left: '50%',
          right: 'auto',          
          padding: '30px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#404040'
        },
    };

    // FUNCAO FILTRO 
    function filterCashShortage(){
        alert('filter');
    }

    //Função de selecionar Quebra de caixa desejado
    function handleSelectCashShortage(id: string){
        alert(id);
    }

    return(
        <Modal isOpen={isOpen} onRequestClose={() => onRequestClose} style={customStyles}>
            <div className={styles.container}>
                <h1>LISTA QUEBRA DE CAIXAS EM ABERTO</h1>

                <div className={styles.filterContainer}>
                    <div className={styles.filter}>
                        <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)} style={{width: '300px'}}/>
                    </div>

                    <div className={styles.filter}>
                        <Input placeholder={selectedFilter} value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())} style={{width: '350px'}}/>
                    </div>

                    <div className={styles.filter}>
                        <select 
                            name="product" 
                            id="product"
                            value={selectedFilter} 
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="PRODUTO">PRODUTO</option>
                            <option value="SECAO">SEÇÃO</option>
                            <option value="CATEGORIA">CATEGORIA</option>
                            <option value="REPRESENTANTE">REPRESENTANTE</option>
                            <option value="FABRICA">FÁBRICA</option>
                        </select>
                    </div>

                    <div className={styles.filter}>
                        <button onClick={filterCashShortage} className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                    </div>
                </div>

                <article className={styles.listContainer}>
                    <ol className={styles.list}>
                        <li className={styles.liTitle}>
                            <span className={styles.idCashShortage}>ID:</span>
                            <span className={styles.nameCashShortage}>NOME:</span>
                            <span>DIFERENÇA</span>
                            <span>CRIAÇÃO</span>
                            <span>STATUS</span>
                        </li>
                        {listQuebraCaixa.map((item) => (
                            <li key={item.id} onClick={() => handleSelectCashShortage(item.id)}>
                                <span className={styles.idCashShortage}>{item.id}</span>
                                <span className={styles.nameCashShortage}>{item.caixa.colaborador.usuario.nome}</span>
                                <span>R${item.diferenca}</span>
                                <span>{new Date(item.data).toLocaleDateString()}</span>
                                <span>{item.status === true ? 'ABERTO' : 'FECHADO'}</span>
                            </li>
                        ))}
                    </ol>
                </article>

            </div>
        </Modal>
    )
}