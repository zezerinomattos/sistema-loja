import React, { useState, useEffect, useContext, FormEvent} from 'react';
import Link from 'next/link';
import { FcBusinessman, FcBookmark, FcEngineering, FcKey, FcDiploma2, FcConferenceCall, FcPortraitMode } from "react-icons/fc";

import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

// MY IMPORTS
import styles from '../../Header/styles.module.scss';
import { ModalBlock } from '../../ModalBlock';

import { AuthContext } from '../../../contexts/AuthContext';

export function UtilsHeader( param: string ){
    const { user, blockIn } = useContext(AuthContext);
    const router = useRouter();

    const [renderButton, setRenderButton] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoaging] = useState(false);

    function handleItemClick(page: string) {
        setRenderButton(page);
    } 

    // FECHAR MODAL
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
            setIsModalOpen(false);
        } else {
            toast.error('ERRO AO TENTAR DESBLOQUEAR!');
        }

        //setIsModalOpen(false);

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

                        <li>
                            <Link href="/"><FcEngineering size={28}/></Link>
                            <span>CONFIGURAÇÕES</span>
                        </li>

                        <li onClick={() => setIsModalOpen(true)}>
                            <FcKey size={28}/>
                            <span>BLOQUEAR</span>
                        </li>
                    </ul>
                    {
                        isModalOpen && 
                            <ModalBlock 
                                isOpen={isModalOpen}
                                onRequestClose={handleCloseModal}
                                loading={loading}
                                email={user.email}
                            />
                    }
                </>
            );

            break;

        case 'colaborador':
            return(
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
            );
            
            break;

        case 'cliente':
            return(
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
            );
            break;
        
        case 'produto':
            return(
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
            );
            break;

        case 'representante':
            return(
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
