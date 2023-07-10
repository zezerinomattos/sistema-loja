import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';


// MY IMPORTS
import styles from './styles.module.scss';
import { UtilsHeader } from '../Utils/UtilsHeader';


export function Header(){
    const router = useRouter();
    const [activeLink, setActiveLink] = useState('')

    const [renderPage, setRenderPage] = useState('');

    const [teste, setTest] = useState('');

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

            //Colaborador
            case 'newcontributor':
                setRenderPage('colaborador');
                setTest('newcontributor');
                break;

            case 'listcontributor':
                setRenderPage('colaborador');
                break;

            case 'detailcontributor':
                setRenderPage('colaborador');
                break;
        
            default:
                //setRenderPage(currentPath);
                break;
        }

    }, [router.pathname]);

    //console.log(activeLink)

    return(
        <div className={styles.container}>
            <div className={styles.containerSuperior}>
                <ul className={styles.ulSuperior}>
                    <li onClick={() => handleItemClick('arquivo')} className={renderPage === 'arquivo' ? styles.actived : ''} >ARQUIVO</li>
                    <li onClick={() => handleItemClick('colaborador')} className={renderPage === 'colaborador' ? styles.actived : ''} >COLABORADOR</li>
                    <li onClick={() => handleItemClick('cliente')} className={renderPage === 'cliente' ? styles.actived : ''} >CLIENTE</li>
                    <li onClick={() => handleItemClick('produto')} className={renderPage === 'produto' ? styles.actived : ''} >PRODUTOS</li>
                    <li onClick={() => handleItemClick('representante')} className={renderPage === 'representante' ? styles.actived : ''} >REPRESENTATES</li>
                    <li onClick={() => handleItemClick('fabricas')} className={renderPage === 'fabricas' ? styles.actived : ''} >FABRICAS</li>
                    <li onClick={() => handleItemClick('pedidos')} className={renderPage === 'pedidos' ? styles.actived : ''} >PEDIDOS</li>
                    <li onClick={() => handleItemClick('caixa')} className={renderPage === 'caixa' ? styles.actived : ''} >CAIXA</li>
                    <li onClick={() => handleItemClick('financeiro')} className={renderPage === 'financeiro' ? styles.actived : ''} >FINANCEIRO</li>
                    <li onClick={() => handleItemClick('crediario')} className={renderPage === 'crediario' ? styles.actived : ''} >CREDIÁRIO</li>
                    <li >SAIR</li>
                </ul>
            </div>

            <div className={styles.containerInferior}>
                {
                    UtilsHeader(renderPage)
                }
            </div>
        </div>
    )
}