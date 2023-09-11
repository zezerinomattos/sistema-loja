import React, {useState} from 'react';
import Modal from 'react-modal';


//MY IMPORTS
import styles from './styles.module.scss';
import { Input, TextArea } from '../../Ui/Input';
import { Button } from '../../Ui/Button';

interface ModalOrderProduct{
    isOpen: boolean;
    onRequestClose: () => void;
    //productSelected: ProductApiResponse[];
}

export function ModalDetailOrder({ isOpen, onRequestClose }: ModalOrderProduct){

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
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <div className={styles.container}>
                <h1 style={{color: '#FFF'}}>Modal</h1>
            </div>
        </Modal>
    )
}