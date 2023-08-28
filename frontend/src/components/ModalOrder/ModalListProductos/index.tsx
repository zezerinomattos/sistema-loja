import React from 'react';
import Modal from 'react-modal';

//MY IMPORTS
import styles from './styles.module.scss';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    //product: ProductApiResponse[];
}

export function ModalListProductos({ isOpen, onRequestClose }: ModalProps){
    
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
            
            </div>
        </Modal>
    )
}