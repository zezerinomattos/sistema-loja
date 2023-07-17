import React, { useState } from 'react';
import { FcLock } from "react-icons/fc";
import Modal from 'react-modal';

// MY IMPORTS
import styles from './styles.module.scss';
import { Input } from '../Ui/Input';
import { Button } from '../Ui/Button';

interface ModalBlockProps {
    isOpen: boolean;
    onRequestClose: (password: string) => void;
    loading: boolean;
    email: string;
}

export function ModalBlock({ isOpen, onRequestClose, loading, email }: ModalBlockProps){

    const customStyles = {
        content: {
          top: '50%',
          bottom: 'auto',
          left: '50%',
          right: 'auto',          
          padding: '30px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#8C8C8C'
        },
    };

    const [password, setPassword] = useState('');

    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={() => onRequestClose(password)} 
            shouldCloseOnOverlayClick={false} // <--- Impede o fechamento ao clicar fora do modal 
            style={customStyles}
        >
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>BLOQUEADO</h1>
                    <FcLock size={35}/>
                </div>
                <span><strong>ATENÇÃO:</strong> SOMENTE O USUÁRIO QUE BLOQUEOU É QUEM PODE DESBLOQUEAR!</span>

                <form >
                    <label>{email}</label>
                    <Input type='password' placeholder='senha' onChange={(e) => setPassword(e.target.value)} />

                    <Button onClick={() => onRequestClose(password)} type='button' loading={loading} style={{padding: '10px 20px', boxShadow: '2px 2px 2px #0D0D0D'} } >DESBLOQUEAR</Button>
                </form>
            </div>
        </Modal>
    );
}