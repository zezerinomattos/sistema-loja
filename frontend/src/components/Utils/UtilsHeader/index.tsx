import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { FcBusinessman, FcBookmark, FcEngineering, FcKey, FcDiploma2, FcConferenceCall, FcPortraitMode } from "react-icons/fc";

// MY IMPORTS
import styles from '../../Header/styles.module.scss';

export function UtilsHeader( param: string ){

    const [renderButton, setRenderButton] = useState('');

    function handleItemClick(page: string) {
        setRenderButton(page);
    } 

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
                    <li onClick={() => handleItemClick('newColaborador')} className={renderButton === 'newColaborador' ? styles.actived : ''} >
                        <Link href="/newcontributor"><FcBusinessman size={28}/>
                            <span>NOVO <br/> COLABORADOR</span>
                        </Link>
                    </li>

                    <li onClick={() => handleItemClick('lisColaborador')} className={renderButton === 'lisColaborador' ? styles.actived : ''}>
                        <Link href="/"><FcConferenceCall size={28}/>
                            <span>LISTA <br/> COLABORADOR</span>
                        </Link>
                    </li>

                    <li onClick={() => handleItemClick('detalheColaborador')} className={renderButton === 'detalheColaborador' ? styles.actived : ''}>
                        <Link href="/"><FcPortraitMode size={28}/>
                            <span>DETALHE COLABORADOR</span>
                        </Link>
                    </li>

                    <li onClick={() => handleItemClick('Colaborador')} className={renderButton === 'Colaborador' ? styles.actived : ''}>
                        <Link href="/"><FcBusinessman size={28}/>
                            <span><strong>+</strong> COLABORADOR</span>
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
