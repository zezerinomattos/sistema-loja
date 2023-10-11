import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router';


// MY IMPORTS
import styles from './styles.module.scss';
import { UtilsHeader } from '../Utils/UtilsHeader';

import { AuthContext } from '@/contexts/AuthContext';

interface HeaderProps{
    title: string
    id?: string;
}


export function Header({title, id}: HeaderProps){
    const { user, signOut } = useContext(AuthContext);
    const isGerente = user.cargo === 'GERENTE';
    const isAdmim = user.cargo === 'ADMIM';
    const isVendedor = user.cargo === 'VENDEDOR';
    const isCaixa = user.cargo === 'CAIXA';

    const router = useRouter();
    const [activeLink, setActiveLink] = useState('')

    const [renderPage, setRenderPage] = useState('');

    const [titleHeader, setTitleHeader] = useState(title || '');

    function handleItemClick(page: string) {
        setRenderPage(page);
    }

    useEffect(() => {
        const currentPath = router.pathname.replace('/', '');
        setActiveLink(currentPath);

        switch (currentPath) {
            //Pagina inicial
            case 'dashboard':
                setRenderPage('arquivo');
                break;

            //Arquivo
            case 'save':
                setRenderPage('arquivo');
                break;

            //----------------
            //Colaborador
            case 'collaborator/newcollaborator':
                setRenderPage('colaborador');
                break;

            case 'collaborator/listcollaborator':
                setRenderPage('colaborador');
                break;

            case 'collaborator/editcollaborator':
                setRenderPage('colaborador');
                break;
        
            //-----------------
            //Cliente
            case 'client/newclient':
                setRenderPage('cliente');
                break;

            case 'client/listclient':
                setRenderPage('cliente');
                break;

            case 'client/editclient':
                setRenderPage('cliente');
                break;

            //------------
            //Representante
            case 'representative/newrepresentative':
                setRenderPage('representante');
                break;

            case 'representative/listrepresentative':
                setRenderPage('representante');
                break;

            case 'representative/editrepresentative':
                setRenderPage('representante');
                break;

             //------------
            //Fabrica
            case 'factory/newfactory':
                setRenderPage('fabricas');
                break;

            case 'factory/listfactory':
                setRenderPage('fabricas');
                break;

            case 'factory/editfactory':
                setRenderPage('fabricas');
                break;

            //Produto
            case 'product/newproduct':
                setRenderPage('produto');
                break;

            case 'product/listproduct':
                setRenderPage('produto');
                break;

            case 'product/editproduct':
                setRenderPage('produto');
                break;

            case 'product/section/newsection':
                setRenderPage('produto');
                break;
            
            case 'product/section/listsection':
                setRenderPage('produto');
                break;

            case 'product/category/newcategory':
                setRenderPage('produto');
                break;

            case 'product/category/listcategory':
                setRenderPage('produto');
                break;

            //------------
            //Order
            case 'order/neworder':
                setRenderPage('pedidos');
                break;

            case 'order/listorder':
                setRenderPage('pedidos');
                break;

            case 'order/editorder':
                setRenderPage('pedidos');
                break;

            //------------
            //Caixa
            case 'cash/opencash':
                setRenderPage('caixa');
                break;

            case 'cash/entrycash':
                setRenderPage('caixa');
                break;

            case 'cash/withdrawalcash':
                setRenderPage('caixa');
                break;

            case 'cash/closedcash':
                setRenderPage('caixa');
                break;
            
            case 'cash/cashshortage':
                setRenderPage('caixa');
                break;

            case 'cash/editcashshortage':
                setRenderPage('caixa');
                break;
            
            case 'cash/cashregister':
                setRenderPage('caixa');
                break;

            //Default
            default:
                //setRenderPage(currentPath); 
                break;
        }

    }, [router.pathname]);

    useEffect(() => {
        //VERIFICANDO SE TEM ID NA ROTA SE TIVER É O ID DA ROTA DE ORDER
        if(id){
            setRenderPage('pedidos');
        }
    });

    //console.log(activeLink) 

    return(
        <div className={styles.container}>
            <div className={styles.containerSuperior}>
                <ul className={styles.ulSuperior}>
                    <li onClick={() => handleItemClick('arquivo')} className={renderPage === 'arquivo' ? styles.actived : ''} >ARQUIVO</li>
                    <li style={{pointerEvents: isGerente || isAdmim ? 'auto' : 'none'}} onClick={() => handleItemClick('colaborador')} className={renderPage === 'colaborador' ? styles.actived : ''} >COLABORADOR</li>
                    <li onClick={() => handleItemClick('cliente')} className={renderPage === 'cliente' ? styles.actived : ''} >CLIENTE</li>
                    <li onClick={() => handleItemClick('produto')} className={renderPage === 'produto' ? styles.actived : ''} >PRODUTOS</li>
                    <li onClick={() => handleItemClick('representante')} className={renderPage === 'representante' ? styles.actived : ''} >REPRESENTATES</li>
                    <li onClick={() => handleItemClick('fabricas')} className={renderPage === 'fabricas' ? styles.actived : ''} >FABRICAS</li>
                    <li style={{pointerEvents: isGerente || isAdmim || isVendedor ? 'auto' : 'none'}} onClick={() => handleItemClick('pedidos')} className={renderPage === 'pedidos' ? styles.actived : ''} >PEDIDOS</li>
                    <li style={{pointerEvents: isGerente || isAdmim || isCaixa ? 'auto' : 'none'}} onClick={() => handleItemClick('caixa')} className={renderPage === 'caixa' ? styles.actived : ''} >CAIXA</li>
                    <li onClick={() => handleItemClick('financeiro')} className={renderPage === 'financeiro' ? styles.actived : ''} >FINANCEIRO</li>
                    <li onClick={() => handleItemClick('crediario')} className={renderPage === 'crediario' ? styles.actived : ''} >CREDIÁRIO</li>
                    <li onClick={signOut}>SAIR</li>
                </ul>
            </div>

            <div className={styles.containerInferior}>
                {
                    UtilsHeader(renderPage, titleHeader)
                }
            </div>
        </div>
    )
}