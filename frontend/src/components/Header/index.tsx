import React, { useState } from 'react';
import Link from 'next/link';
import { FcBusinessman, FcBookmark, FcEngineering, FcKey, FcDiploma2 } from "react-icons/fc";


// MY IMPORTS
import styles from './styles.module.scss';

export function Header(){

    const [renderPage, setRenderPage] = useState('arquivo');

    function handleItemClick(page: string) {
        setRenderPage(page);
    }

    function handleButtonPage(param: string){
        switch (param) {
            case 'arquivo':
                return(
                    <ul className={styles.paginas}>
                        <li>
                            <Link href="/"><FcBookmark size={28}/></Link>
                            <span>SALVAR</span>
                        </li>

                        <li>
                            <Link href="/"><FcDiploma2 size={28}/></Link>
                            <span>IMPREIMIR</span>
                        </li>

                        <li>
                            <Link href="/"><FcEngineering size={28}/></Link>
                            <span>CONFIGURAÇÕES</span>
                        </li>

                        <li>
                            <Link href="/"><FcKey size={28}/></Link>
                            <span>BLOQUEAR</span>
                        </li>
                    </ul>
                );

                break;

            case 'colaborador':
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
            
            case 'contasPagar':
                break;

            case 'crediario':
                break;
        
            default:
                break;
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.containerSuperior}>
                <ul className={styles.ulSuperior}>
                    <li onClick={() => handleItemClick('arquivo')}>ARQUIVO</li>
                    <li onClick={() => handleItemClick('colaborador')}>COLABORADOR</li>
                    <li onClick={() => handleItemClick('cliente')}>CLIENTE</li>
                    <li onClick={() => handleItemClick('produto')}>PRODUTOS</li>
                    <li onClick={() => handleItemClick('representante')}>REPRESENTATES</li>
                    <li onClick={() => handleItemClick('fabricas')}>FABRICAS</li>
                    <li onClick={() => handleItemClick('pedidos')}>PEDIDOS</li>
                    <li onClick={() => handleItemClick('caixa')}>CAIXA</li>
                    <li onClick={() => handleItemClick('contasPagar')}>CONTAS A PAGAR</li>
                    <li onClick={() => handleItemClick('crediario')}>CREDIÁRIO</li>
                    <li >SAIR</li>
                </ul>
            </div>

            <div className={styles.containerInferior}>
                {handleButtonPage(renderPage)}
            </div>
        </div>
    )
}












