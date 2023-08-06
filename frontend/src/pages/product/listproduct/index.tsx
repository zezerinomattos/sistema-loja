import React, { useContext, useEffect, useState  } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';

import { Input } from '../../../components/Ui/Input';
import { ModalProduct } from '../../../components/ModalProduct';
import { ModalFactory } from '../../../components/ModalFactory';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

type ProductProps = {
    id: string;
    nome_produto: string;
    marca: string;
    preco_venda: string;
}

interface ListProps{
    product: ProductProps[];
}

export type ProductDetailProps = {
    id: string;
    nome_produto: string;
    marca: string;
    material: string;
    descricao: string;
    custo: number;
    porcentagem_venda: number;
    preco_venda: number;
    margem_lucro: number;
    desconto_atual: number;
    foto: string;
    desconto_maximo: number;
    secao_id: string;
    categoria_id: string;
    fabrica_id: string;
    representante_id: string;
    produto_cor: Array<{
        cor: string;
        produto_tamanhos_estoque: Array<{
            tamanho: string;
            estoque: number;
        }>;
    }>;
    secao: {
        nome_secao: string;
    };
    categoria: {
        nome_categoria: string;
    };
    representante:{
        usuario:{
            nome: string;
        };
    };
    fabrica:{
        empresa: string;
    }
    created_at: Date;
    updated_at: Date;
}

export type ProductApiResponse = {
    produto: ProductDetailProps;
};

export default function ListProduct({ product }: ListProps){

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [productLyList, setProductList] = useState(product || []);

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');

    const [modalProduct, setModalProduct] = useState<ProductApiResponse[]>();
    const [modalVisible, setModalVisible] = useState(false);

    //FUNCAO PARA DETALHAR FABRICA SELECIONADO
    async function handleOpenModalView(id: string){
        await api.get('/produto/detail', {
            params: {
                produto_id: id,
            }
        })
        .then(response => {
            setModalProduct([response.data])
            setModalVisible(true);
        });
    }
    
    console.log(modalProduct);
    // FUNCAO FECHAR MODAL
    function handleCloseModal(){
        setModalVisible(false);
    }

    // FUNCAO PARA DELETAR FABRICA
    async function handleDelete(id: string){
        alert(id)
    }

    // FUNCAO FILTRO 
    function filterFactory(){
        //FILTRANDO SE TEM ID
        if(listId){
            const filterFactory = product.filter((prod) => prod.id.includes(listId));
            setProductList(filterFactory);
        }

        //FILTRANDO PELO NOME
        if(!listId && listName){
            const filterFactory = product.filter((prod) => prod.nome_produto.includes(listName));
            setProductList(filterFactory);
        }

        //FILTRANDO TODOS
        if(!listName && !listId){
            clearFilter();
        }
    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setProductList(product);
        setListId('');
        setListName('');
    }

    // ATUALIZAR O FILTRO À MEDIDA QUE DIGITA
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            filterFactory();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [listName]);

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    Modal.setAppElement('#__next');

    return(
        <div className={styles.container}>
            <Header title={'LISTA FABRICAS'}/>

            <main className={styles.containerFavorit}>
                <Presentation />

                <div className={styles.rigthContainer}>
                    <div className={styles.filterContainer}>
                        <div className={styles.filter}>
                            <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)} style={{width: '320px'}}/>
                        </div>

                        <div className={styles.filter}>
                            <Input placeholder='EMPRESA' value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())}/>
                        </div>

                        <div className={styles.filter}>
                            <button onClick={filterFactory} className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                        </div>
                    </div>

                    <article className={styles.listContainer}>
                        <ol className={styles.list}>
                            {productLyList.map(prod => (
                                <li key={prod.id}>
                                    <span className={styles.idDetail}>{prod.id}</span>
                                    <span onClick={() => handleOpenModalView(prod.id)} className={styles.nameDetail}>{prod.nome_produto}</span>
                                    <span>{prod.marca}</span>
                                    <span>{prod.preco_venda}</span>
                                    <BsTrash 
                                        size={20} 
                                        style={{color: '#FF3F4B', cursor: 'pointer'}}
                                        onClick={() => handleDelete(prod.id)}
                                    />           
                                </li>
                            ))}
                        </ol>
                    </article>
                    
                </div>
            </main>
            {
                modalVisible && modalProduct && modalProduct.length > 0 && (
                    <ModalProduct
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        product={modalProduct}
                    />
                )
            }
        </div>
    );
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    //@ts-ignore
    const apiProduct = setupAPIClient(ctx);
    const response = await apiProduct.get('produto');

    return{
        props: {
            product: response.data
        }
    }
})