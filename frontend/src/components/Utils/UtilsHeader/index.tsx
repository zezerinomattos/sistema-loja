import React, { useState, useEffect, useContext, FormEvent} from 'react';
import Link from 'next/link';
import { FcBusinessman, FcBookmark, FcEngineering, FcKey, FcDiploma2, FcConferenceCall, FcPortraitMode } from "react-icons/fc";

import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

// MY IMPORTS
import styles from '../../Header/styles.module.scss';
import { ModalBlock, ModalSettings } from '../../ModalBlock';

import { AuthContext } from '../../../contexts/AuthContext';

export function UtilsHeader( param: string, title: string ){
    const { user, blockIn, toEditPassaword } = useContext(AuthContext);
    const router = useRouter();

    const [renderButton, setRenderButton] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoaging] = useState(false);

    const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);

    function handleItemClick(page: string) {
        setRenderButton(page);
    } 

    // FECHAR MODAL DE BLOQUEIO
    async function handleCloseModal(password: string){

        if(!user.email || !password){          
            toast.error('PREENCHA OS DADOS');
            return;
        }

        setLoaging(true);

        let data = {
            email: user.email,
            senha: password,
        }

        const isBlock = await blockIn(data);

        if (isBlock) {
            toast.success('DESBLOQUEADO COM SUCESSO!');
            setIsModalOpen(false);
        } else {
            toast.error('ERRO AO TENTAR DESBLOQUEAR!');
        }

        //setIsModalOpen(false);

        setLoaging(false);
        
    }

    // FECHAR MODAL DE CONFIGURAÇÕES
    async function handleCloseModalSettings(){
        setIsModalSettingsOpen(false);
    }

    // FUNÇÃO MODAL PARA ALTERAR A SENHA DO USER LOGADO
    async function handleChangePassword(password: string, newPassword: string, confirmNewPassword: string){
        //const newPasswordUper = newPassword.toUpperCase();

        if(!user.email || !password || !newPassword || !confirmNewPassword){
            toast.error('Preencha todos os campos');
            return;
        }

        if(newPassword.toUpperCase() !== confirmNewPassword.toUpperCase()){
            toast.error('Senha de confirmação diferente');
            return;
        }

         //Validando senha segura
         if(newPassword.length < 8 || !/[a-zA-Z]/.test(newPassword) || !/[^a-zA-Z0-9]/.test(newPassword)){
            toast.error('A senha precisa ter pelo menos 8 caracteres, uma letra e um caractere especial');
            return;
        }

        setLoaging(true);

        const colaborador_id = user.colaborador_id;
        const email = user.email;
        const senha = password;

        await toEditPassaword({colaborador_id, email, senha, newPassword});

        setLoaging(false);
    }

    useEffect(() => {
        // Verifica se o modal está aberto no Local Storage
        const isModalOpen = localStorage.getItem('isModalOpen');
    
        if (isModalOpen === 'true') {
          setIsModalOpen(true);
        }
    }, []);
    
      useEffect(() => {
        // Salva o estado do modal no Local Storage sempre que ele for alterado
        localStorage.setItem('isModalOpen', isModalOpen.toString());

    }, [isModalOpen]);

    Modal.setAppElement('#__next');

    switch (param) {
        case 'arquivo':
            return(
                <>
                    <ul className={styles.paginas}>
                        <li>
                            <Link href="/"><FcBookmark size={28}/></Link>
                            <span>SALVAR</span>
                        </li>

                        <li>
                            <Link href="/"><FcDiploma2 size={28}/></Link>
                            <span>IMPRIMIR</span>
                        </li>

                        <li onClick={() => setIsModalSettingsOpen(true)}>
                            <FcEngineering size={28}/>
                            <span>CONFIGURAÇÕES</span>
                        </li>

                        <li onClick={() => setIsModalOpen(true)}>
                            <FcKey size={28}/>
                            <span>BLOQUEAR</span>
                        </li>
                    </ul>
                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                    {
                        isModalOpen && 
                            <ModalBlock 
                                isOpen={isModalOpen}
                                onRequestClose={handleCloseModal}
                                loading={loading}
                                email={user.email}
                            />
                    }

                    {
                        isModalSettingsOpen && 
                            <ModalSettings 
                                isOpen={isModalSettingsOpen}
                                onRequestClose={handleCloseModalSettings}
                                changePassword={handleChangePassword}
                                loading={loading}
                                email={user.email}
                            />
                    }
                </>
            );

            break;

        case 'colaborador':
            return(
                <>
                    <ul className={styles.paginas}>
                        <li onClick={() => handleItemClick('newColaborador')} className={renderButton === 'newColaborador' ? styles.actived : ''} >
                            <Link href="/collaborator/newcollaborator">
                                <FcBusinessman size={28}/>
                                <span>NOVO <br/> COLABORADOR</span>
                            </Link>
                        </li>

                        <li onClick={() => handleItemClick('lisColaborador')} className={renderButton === 'lisColaborador' ? styles.actived : ''}>
                            <Link href="/collaborator/listcollaborator">
                                <FcConferenceCall size={28}/>
                                <span>LISTA <br/> COLABORADOR</span>
                            </Link>
                        </li>

                        <li onClick={() => handleItemClick('editcollaborator')} className={renderButton === 'editcollaborator' ? styles.actived : ''}>
                            <Link href="/collaborator/editcollaborator">
                                <FcPortraitMode size={28}/>
                                <span>EDITAR COLABORADOR</span>
                            </Link>
                        </li>

                    </ul>

                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                </>
                
            );
            
            break;

        case 'cliente':
            return(
                <>
                    <ul className={styles.paginas}>
                        <li onClick={() => handleItemClick('newClient')} className={renderButton === 'newClient' ? styles.actived : ''}>
                            <Link href="/client/newclient">
                                <FcBusinessman size={28}/>
                                <span><strong>NOVO</strong><br />CLIENTE</span>
                            </Link>
                        </li>

                        <li onClick={() => handleItemClick('listClient')} className={renderButton === 'listClient' ? styles.actived : ''}>
                            <Link href="/client/listclient">
                                <FcBusinessman size={28}/>
                                <span><strong>+</strong> COLABORADOR</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <FcBusinessman size={28}/>
                                <span><strong>+</strong> COLABORADOR</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/"><FcBusinessman size={28}/></Link>
                            <span><strong>+</strong> COLABORADOR</span>
                        </li>
                    </ul>

                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                </>
            );
            break;
        
        case 'produto':
            return(
                <>
                    <ul className={styles.paginas}>
                        <li>
                            <Link href="/"><FcBusinessman size={28}/></Link>
                            <span><strong>+</strong> COLABORADOR</span>
                        </li>

                        <li>
                            <Link href="/"><FcBusinessman size={28}/></Link>
                            <span><strong>+</strong> COLABORADOR</span>
                        </li>

                        <li>
                            <Link href="/"><FcBusinessman size={28}/></Link>
                            <span><strong>+</strong> COLABORADOR</span>
                        </li>

                        <li>
                            <Link href="/"><FcBusinessman size={28}/></Link>
                            <span><strong>+</strong> COLABORADOR</span>
                        </li>
                    </ul>

                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                </>
            );
            break;

        case 'representante':
            return(
                <>
                    <ul className={styles.paginas}>
                        <li>
                            <Link href="/"><FcBusinessman size={28}/></Link>
                            <span><strong>+</strong> COLABORADOR</span>
                        </li>

                        <li>
                            <Link href="/"><FcBusinessman size={28}/></Link>
                            <span><strong>+</strong> COLABORADOR</span>
                        </li>

                        <li>
                            <Link href="/"><FcBusinessman size={28}/></Link>
                            <span><strong>+</strong> COLABORADOR</span>
                        </li>

                        <li>
                            <Link href="/"><FcBusinessman size={28}/></Link>
                            <span><strong>+</strong> COLABORADOR</span>
                        </li>
                    </ul>

                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                </>
            );
            break;

        case 'fabricas':
            break;
        
        case 'pedidos':
            break;

        case 'caixa':
        break;
        
        case 'financeiro':
            break;

        case 'crediario':
            break;
    
        default:
            break;
    }
}