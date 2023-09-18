import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FcCancel } from "react-icons/fc";

//MY IMPORTS
import styles from './styles.module.scss';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: ( res: string ) => void;
}

export function ModalAlert({ isOpen, onRequestClose }: ModalProps){

    const [selectOption, setSelectoption] = useState('');;
    const [modalClosedByButton, setModalClosedByButton] = useState(false);

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

    const closeModal = () => {
        onRequestClose(selectOption)
    }

    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div className={styles.container}>
            <h1><FcCancel width={80}/> Excluir Pedido</h1>
            <div className={styles.inputContainer}>
                <span>Você tem certeza que deseja DELETAR essa order?</span>
                <Button type='button' onClick={() => setSelectoption('sim')} >SIM</Button>
                <Button type='button' onClick={() => setSelectoption('nao')} >NÃO</Button>
            </div>
        </div>
    </Modal>

}