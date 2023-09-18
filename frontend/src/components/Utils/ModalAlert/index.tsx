import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FcCancel } from "react-icons/fc";

//MY IMPORTS
import styles from './styles.module.scss';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

interface ModalProps{
    isOpen: boolean;
    idOrder: string;
    titleAlert: string;
    menssageAlert: string;
    onRequestClose: ( res: string, id: string ) => void;
}

export function ModalAlert({ isOpen, idOrder, titleAlert, menssageAlert, onRequestClose }: ModalProps){

    // const [selectOption, setSelectoption] = useState('');;
    const [modalClosedByButton, setModalClosedByButton] = useState(false);
    const [alertIdOrder, setAlertIdOrder] = useState('');

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

    const closeModal = (option: string) => {
        //onRequestClose(selectOption, alertIdOrder)
        onRequestClose(option, idOrder);
    }

    return(
        <Modal isOpen={isOpen} style={customStyles}>
            <div className={styles.container}>
                <h1><FcCancel width={100} style={{marginRight: '5px'}}/> {titleAlert}</h1>
                <div className={styles.alertContainer}>
                    <span>{menssageAlert}</span>
                    <div className={styles.alertButton}>
                        <Button type='button' onClick={() => closeModal('sim')} style={{background: '#FF3F4B'}}>SIM</Button>
                        <Button type='button' onClick={() => closeModal('nao')} style={{background: '#D9D9D9', color: '#000'}}>NÃO</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )

}