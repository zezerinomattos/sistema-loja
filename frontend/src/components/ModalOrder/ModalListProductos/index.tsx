import React, { useContext, useEffect, useState  } from 'react';
import Modal from 'react-modal';
import { FcSearch } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";

//MY IMPORTS
import styles from './styles.module.scss';
import { Input } from '../../../components/Ui/Input';
import { ModalProduct } from '../../../components/ModalProduct';
import { ProductDetailProps, ProductApiResponse } from '../../../pages/product/listproduct';

import { ListProps, ProductProps } from '../../../pages/order/cart/[id]';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    productLyList: ListProps[];
}

export function ModalListProductos({ isOpen, onRequestClose, productLyList }: ModalProps){

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('PRODUTO');

    const [productList, setProductList] = useState(productLyList || []);

    //SELECIONANDO QUAL LINHA ESTA DA LISTA
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    
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

    // FUNCAO FILTRO 
    function filterProduct(){
        //FILTRANDO SE TEM ID
        if(listId){
            const filterProd = productLyList.filter((prod) => prod.lisProduct[0].id.includes(listId));
            setProductList(filterProd);
        }

        //FILTRANDO PELO NOME
        if(!listId && listName && selectedFilter === 'PRODUTO'){
            const filterProduct = productLyList.filter((prod) => prod.lisProduct[0].nome_produto.includes(listName));
            setProductList(filterProduct);
        }

        //FILTRANDO PELO SECAO
        if(!listId && listName && selectedFilter === 'SECAO'){
            const filterSection = productLyList.filter((prod) => prod.lisProduct[0].secao.nome_secao.includes(listName));
            setProductList(filterSection);
        }

        //FILTRANDO PELO CATEGORIA
        if(!listId && listName && selectedFilter === 'CATEGORIA'){
            const filterCategory = productLyList.filter((prod) => prod.lisProduct[0].categoria.nome_categoria.includes(listName));
            setProductList(filterCategory);
        }

        //FILTRANDO PELO REPRESENTANTE
        if(!listId && listName && selectedFilter === 'REPRESENTANTE'){
            const filterRepresentative = productLyList.filter((prod) => prod.lisProduct[0].representante.usuario.nome.includes(listName));
            setProductList(filterRepresentative);
        }

        //FILTRANDO PELO FABRICA
        if(!listId && listName && selectedFilter === 'FABRICA'){
            const filterFactory = productLyList.filter((prod) => prod.lisProduct[0].fabrica.empresa.includes(listName));
            setProductList(filterFactory);
        }

        //FILTRANDO TODOS
        if(!listName && !listId){
            clearFilter();
        }
    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setProductList(productLyList);
        setListId('');
        setListName('');
    }

    // ATUALIZAR O FILTRO À MEDIDA QUE DIGITA
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            filterProduct();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [listName]);

    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <div className={styles.container}>
                <h1>LISTA PRODUTOS</h1>

                <div className={styles.filterContainer}>
                    <div className={styles.filter}>
                        <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)} style={{width: '300px'}}/>
                    </div>

                    <div className={styles.filter}>
                        <Input placeholder={selectedFilter} value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())} style={{width: '350px'}}/>
                    </div>

                    <div className={styles.filter}>
                        <select 
                            name="product" 
                            id="product"
                            value={selectedFilter} 
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="PRODUTO">PRODUTO</option>
                            <option value="SECAO">SEÇÃO</option>
                            <option value="CATEGORIA">CATEGORIA</option>
                            <option value="REPRESENTANTE">REPRESENTANTE</option>
                            <option value="FABRICA">FÁBRICA</option>
                        </select>
                    </div>

                    <div className={styles.filter}>
                        <button onClick={filterProduct} className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                    </div>
                </div>

                <article className={styles.listContainer}>
                    
                    <ol className={styles.list}>
                        {productList.map((prod, index)=> (
                            <li 
                                key={prod.lisProduct[0].id}
                                className={index === 0 ? styles.firstItemHover : ''}
                            >
                                <span className={styles.idDetail}>{prod.lisProduct[0].id}</span>
                                <span className={styles.nameDetail}>{prod.lisProduct[0].nome_produto}</span>
                                <span>{prod.lisProduct[0].marca}</span>
                                <span>{prod.lisProduct[0].preco_venda}</span>         
                            </li>
                        ))}
                    </ol>
                </article>
            </div>
        </Modal>
    )
}