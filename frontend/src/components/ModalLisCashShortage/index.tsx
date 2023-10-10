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

export function ModalListQuebraCaixa({ isOpen, onRequestClose, listQuebraCaixa }: ModalProps){
    const [listId, setListId] = useState('');

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


    return(
        <Modal isOpen={isOpen} onRequestClose={() => onRequestClose} style={customStyles}>
            <div className={styles.container}>
                <h1>LISTA QUEBRA DE CAIXAS EM ABERTO</h1>
               {listQuebraCaixa.map((item) => (
                    <div key={item.id}>
                        <h1>{item.id}</h1>
                        <h1>{item.caixa.colaborador.usuario.nome}</h1>
                    </div>
               ))}

            </div>
        </Modal>
    )
}