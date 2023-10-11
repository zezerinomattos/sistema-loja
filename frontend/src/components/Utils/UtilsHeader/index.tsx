import React, { useState, useEffect, useContext, FormEvent} from 'react';
import Link from 'next/link';
import { FcBusinessman, FcBookmark, FcEngineering, FcKey, FcDiploma2, FcConferenceCall, FcPortraitMode, FcBusinesswoman, FcPodiumWithAudience, FcCollaboration, FcBriefcase, FcFactory, FcTodoList, FcPaid, FcList, FcCalculator } from "react-icons/fc";
import { BsPersonLinesFill, BsBuildingFillUp, BsFillPersonVcardFill, BsTagsFill, BsReverseListColumnsReverse, BsPencilSquare, BsClipboardPlusFill, BsFillFileRuledFill, BsFillGrid1X2Fill, BsClipboard2Plus } from "react-icons/bs";
import { FaPencilAlt, FaCashRegister } from "react-icons/fa";
import {FaMoneyBillTrendUp } from "react-icons/fa6";
import { BiMoneyWithdraw } from 'react-icons/bi';
import { LiaCashRegisterSolid } from 'react-icons/lia';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';

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
                                <FcBusinesswoman size={28}/>
                                <span><strong>NOVO</strong><br />CLIENTE</span>
                            </Link>
                        </li>

                        <li onClick={() => handleItemClick('listClient')} className={renderButton === 'listClient' ? styles.actived : ''}>
                            <Link href="/client/listclient">
                                <FcPodiumWithAudience size={28}/>
                                <span><strong>LISTA</strong><br/>CLIENTES</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/client/editclient">
                                <BsFillPersonVcardFill size={24} style={{color: '#e99a3b'}}/>
                                <span><strong>EDITAR</strong><br />CLIENTE</span>
                            </Link>
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
                            <Link href="/product/newproduct"><BsTagsFill size={28} style={{color: '#F2C4B3'}}/>
                                <span><strong>NOVO</strong><br /> PRODUTO</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/product/listproduct"><BsReverseListColumnsReverse size={28} style={{color: '#ce8730'}}/>
                                <span><strong>LISTA</strong><br /> PRODUTOS</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/product/editproduct"><BsPencilSquare size={28} style={{color: '#ce8730'}}/>
                                <span><strong>EDITAR</strong><br /> PRODUTO</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/product/section/newsection"><BsClipboardPlusFill size={28} style={{color: '#cea495'}} />
                                <span><strong>NOVA</strong><br /> SEÇÃO</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/product/section/listsection"><BsFillFileRuledFill size={28} style={{color: '#ce8730'}}/>
                                <span><strong>LISTA</strong><br /> SEÇÃO</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/product/category/newcategory"><BsClipboard2Plus size={28} style={{color: '#cea495'}}/>
                                <span><strong>NOVA</strong><br /> CATEGORIA</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/product/category/listcategory"><BsFillGrid1X2Fill size={28} style={{color: '#ce8730'}}/>
                                <span><strong>LISTA</strong><br /> CATEGORIA</span>
                            </Link>
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
                            <Link href="/representative/newrepresentative">
                                <FcBriefcase size={28}/>
                                <span><strong>NOVO</strong><br />REPRESENTANTE</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/representative/listrepresentative">
                                <FcCollaboration size={28}/>
                                <span><strong>LISTA</strong><br />REPRESENTANTE</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/representative/editrepresentative">
                                <BsPersonLinesFill size={28} style={{color: '#e99a3b'}}/>
                                <span><strong>EDITAR</strong><br />REPRESENTANTE</span>
                            </Link>
                        </li>
                    </ul>

                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                </>
            );
            break;

        case 'fabricas':
            return(
                <>
                    <ul className={styles.paginas}>
                        <li>
                            <Link href="/factory/newfactory">
                                <FcFactory size={28}/>
                                <span><strong>NOVA</strong><br />FABRICA</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/factory/listfactory">
                                <FcTodoList size={28}/>
                                <span><strong>LISTA</strong><br />FABRICA</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/factory/editfactory">
                                <BsBuildingFillUp size={28} style={{color: '#e99a3b'}}/>
                                <span><strong>EDITAR</strong><br />FABRICA</span>
                            </Link>
                        </li>
                    </ul>

                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                </>
            );
            break;
        
        case 'pedidos':
            return(
                <>
                    <ul className={styles.paginas}>
                        <li>
                            <Link href="/order/neworder">
                                <FcPaid size={28}/>
                                <span><strong>NOVO</strong><br />PEDIDO</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/order/listorder">
                                <FcList size={28}/>
                                <span><strong>LISTA</strong><br />PEDIDOS</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/order/editorder">
                                <FaPencilAlt size={28} style={{color: '#e99a3b'}}/>
                                <span><strong>EDITAR</strong><br />PEDIDO</span>
                            </Link>
                        </li>
                    </ul>

                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                </>
            );
            break;

        case 'caixa':
            return(
                <>
                    <ul className={styles.paginas}>
                        <li>
                            <Link href="/cash/opencash">
                                <FaCashRegister size={28} style={{color: '#e99a3b', marginBottom:'2px'}}/>
                                <span><strong>ABERTURA</strong><br />CAIXA</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/cash/entrycash">
                                <FaMoneyBillTrendUp size={28} style={{color: '#088C7F', marginBottom:'2px'}}/>
                                <span><strong>ENTRADA</strong><br />CAIXA</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/cash/withdrawalcash">
                                <BiMoneyWithdraw size={28} style={{color: '#FF3F4B', marginBottom:'2px'}}/>
                                <span><strong>RETIRADA</strong><br />CAIXA</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/cash/closedcash">
                                <LiaCashRegisterSolid size={28} style={{color: '#e99a3b', marginBottom:'2px'}}/>
                                <span><strong>FECHAR</strong><br />CAIXA</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/cash/cashshortage">
                                <GiPayMoney size={28} style={{color: '#FF3F4B', marginBottom:'2px'}}/>
                                <span><strong>QUEBRA</strong><br />CAIXA</span>
                            </Link>
                        </li>

                        {
                            user.cargo === 'GERENTE' || user.cargo === 'ADMIM' ? (
                                <li>
                                    <Link href="/cash/editcashshortage">
                                        <GiReceiveMoney size={28} style={{color: '#e99a3b', marginBottom:'2px'}}/>
                                        <span><strong>EDITAR QUEBRA</strong><br />CAIXA</span>
                                    </Link>
                                </li>
                            ) : ''
                        }

                        <li>
                            <Link href="/cash/cashregister">
                                <FcCalculator size={28}/>
                                <span><strong>REGITRAR</strong><br />VENDA</span>
                            </Link>
                        </li>
                    </ul>

                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                </>
            )
        break;
        
        case 'financeiro':
            break;

        case 'crediario':
            break;
    
        default:
            break;
    }
}
