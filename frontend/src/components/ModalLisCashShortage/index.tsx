import React, { useEffect, useState, FormEvent } from 'react';
import Modal from 'react-modal';
import { FcSearch } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';

//MY IMPORTS
import styles from './styles.module.scss';
import { Input } from '../../components/Ui/Input';
import { QuebraCaixaProps } from '../../pages/cash/editcashshortage';

import { api } from '../../services/apiClient';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: (quebraCaixaId: string, nomeCaixa: string) => void;
    listQuebraCaixa: QuebraCaixaProps[];
}

export function ModalListCashShortage({ isOpen, onRequestClose, listQuebraCaixa }: ModalProps){
    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');
    const [cashShortageList, setCashShortageList] = useState(listQuebraCaixa || []);

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
        //FILTRANDO SE TEM ID
        if(listId){
            const filteredCollaborators = listQuebraCaixa.filter((cashS) => cashS.id.includes(listId));
            setCashShortageList(filteredCollaborators);
        }

        //FILTRANDO PELO NOME DO CAIXA
        if (!listId && listName) {
            const filteredCollaborators = listQuebraCaixa.filter((cashS) =>
                cashS.caixa.colaborador.usuario.nome.includes(listName)
            );
        
            // Ordena a lista filtrada por data em ordem decrescente
            filteredCollaborators.sort((a, b) => {
                const dateA = new Date(a.data).getTime(); // Converta a data para milissegundos
                const dateB = new Date(b.data).getTime(); // Converta a data para milissegundos
            
                // Ordene em ordem decrescente
                return dateB - dateA;
            });
        
            setCashShortageList(filteredCollaborators);
        }

        //FILTRANDO TODOS
        if(!listName && !listId){
            clearFilter();
        }
    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setCashShortageList(listQuebraCaixa);
        setListId('');
        setListName('');
    }

    // ATUALIZAR O FILTRO À MEDIDA QUE DIGITA
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            filterCashShortage();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [listName, listId]);

    //Função de selecionar Quebra de caixa desejado
    function handleSelectCashShortage(id: string, nomeCaixa: string){
        onRequestClose(id, nomeCaixa);
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
                        <Input placeholder='Cash Shortage' value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())} style={{width: '350px'}}/>
                    </div>

                    <div className={styles.filter}>
                        <button onClick={filterCashShortage} className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                    </div>

                    <div className={styles.filter}>
                        <button onClick={() => handleSelectCashShortage('', '')} className={styles.buttonClose}><AiOutlineClose size={28} style={{marginLeft: '10px'}}/></button>
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
                        {cashShortageList.map((item) => (
                            <li key={item.id} onClick={() => handleSelectCashShortage(item.id, item.caixa.colaborador.usuario.nome)}>
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