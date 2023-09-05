import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';


//MY IMPORTS
import styles from './styles.module.scss';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: ( itemId: string ) => void;
}

export function ModalDeleteItem({ isOpen, onRequestClose }: ModalProps){
    const [selectedItemId, setSelectedItemId] = useState('');
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
        // Feche o modal apenas quando o botão for clicado
        if (modalClosedByButton === true) {
          if(!selectedItemId){
            toast.warning('Informe um código!');
            setModalClosedByButton(false);
          }else{
            onRequestClose(selectedItemId);
          }
        }

        if (modalClosedByButton === false){
          //Se for false(fechar o modal de outra forma que não botao excluindo retorna vazio)
            setSelectedItemId('');
            onRequestClose('');
        }
    };

    useEffect(() => {
        async function handleAsyncCloseModal() {
          if (modalClosedByButton) {
            await closeModal(); // Aguarda o fechamento
          }
        }
    
        handleAsyncCloseModal();
    }, [modalClosedByButton]);
    
    function handleCloseModal() {
        // Feche o modal apenas quando o botão for clicado
        setModalClosedByButton(true);
    }

    return(
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
            <div className={styles.container}>
                <h1>Excluir item</h1>
                <div className={styles.inputContainer}>
                    <Input type='text' placeholder='CÓDIGO' onChange={(e) => setSelectedItemId(e.target.value)} value={selectedItemId}/>
                    <Button type='button' onClick={handleCloseModal} >EXCLUIR ITEM</Button>
                </div>
            </div>
        </Modal>
    )
}