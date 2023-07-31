import React, { useState, useEffect } from 'react';
import { FcLock, FcEngineering } from "react-icons/fc";
import Modal from 'react-modal';

import { useRouter } from 'next/router';

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

interface ModalSettingskProps {
    isOpen: boolean;
    onRequestClose: () => void;
    changePassword: (password: string, newPassword: string, confirmNewPassword: string) => void;
    loading: boolean;
    email: string;
}

// MODAL DE BLOQUEIO DE TELA 
export function ModalBlock({ isOpen, onRequestClose, loading, email }: ModalBlockProps){
    const router = useRouter();

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

    //DESABILITANDO O ENTER PARA QUE O USER PRESSIONE O BOTAO
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Verifica se a tecla pressionada é a tecla Enter
        if (event.key === 'Enter') {
          event.preventDefault(); // Impede a ação padrão do evento (no caso, submit do formulário)
        }
    };

    useEffect(() => {
        router.push('/dashboard');
    }, []);

    useEffect(() => {
        const handleBlockedNavigation = (event: any) => {
          event.preventDefault();
          return false;
        };
    
        window.history.pushState('', '', window.location.href);
        window.addEventListener('popstate', handleBlockedNavigation);
    
        return () => {
          window.removeEventListener('popstate', handleBlockedNavigation);
        };
      }, [router]);

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
                    <Input type='password' placeholder='senha' onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />

                    <Button onClick={() => onRequestClose(password)} type='button' loading={loading} style={{padding: '10px 20px', boxShadow: '2px 2px 2px #0D0D0D'} } >DESBLOQUEAR</Button>
                </form>
            </div>
        </Modal>
    );
}

// MODAL DE CONFIGURAÇÕES;
export function ModalSettings({ isOpen, onRequestClose, changePassword, loading, email }: ModalSettingskProps){
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
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [changeNewPassword, setChangeNewPassword] = useState(false); // estado de click

    //DESABILITANDO O ENTER PARA QUE O USER PRESSIONE O BOTAO
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Verifica se a tecla pressionada é a tecla Enter
        if (event.key === 'Enter') {
          event.preventDefault(); // Impede a ação padrão do evento (no caso, submit do formulário)
        }
    };

    return(
        <Modal
            isOpen={isOpen} 
            onRequestClose={() => onRequestClose()} 
            style={customStyles}
        >

            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>CONFIGURAÇÕES</h1>
                    <FcEngineering size={35}/>
                </div>
                <span><strong>ATENÇÃO:</strong> Por favor, tenha extrema cautela, pois essas configurações podem conter informações sensíveis e confidenciais.</span>

                <div className={styles.settingsContainer}>
                    <ul>
                        <li onClick={() => setChangeNewPassword(!changeNewPassword)}><h4>- ALTERAR SENHA</h4></li>
                    </ul>
                </div>

                {
                    changeNewPassword && 
                        <form >
                            <span><strong>ATENÇÃO:</strong> TENHA CUIDADO PARA NÃO PERDER SUA SENHA, EM CASO DE PERCA SOMENTE A EMPRESA QUE DESENVOLVEL O PROGRAMA PODE RECUPERAR E ISSO PODE DEMANDAR UM CERTO TEMPO!</span>
                            <label>{email}</label>
                            <Input type='password' placeholder='senha atual' onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} value={password}/>
                            <Input type='password' placeholder='nova senha' onChange={(e) => setNewPassword(e.target.value)} onKeyDown={handleKeyDown} value={newPassword}/>
                            <Input type='password' placeholder='confirme nova senha' onChange={(e) => setConfirmNewPassword(e.target.value)} onKeyDown={handleKeyDown} value={confirmNewPassword}/>

                            <Button onClick={() => changePassword(password, newPassword, confirmNewPassword )} type='button' loading={loading} style={{padding: '10px 20px', boxShadow: '2px 2px 2px #0D0D0D'} } >ALTERAR</Button>
                        </form>

                }
                
            </div>

        </Modal>
    )
}
