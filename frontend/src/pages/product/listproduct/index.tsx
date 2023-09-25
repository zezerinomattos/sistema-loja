import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
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
import { ModalAlert } from '../../../components/Utils/ModalAlert';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

type ProductProps = {
    id: string;
    nome_produto: string;
    marca: string;
    preco_venda: string;
    secao: {
        nome_secao: string;
    };
    categoria: {
        nome_categoria: string;
    };
    representante: {
        usuario: {
            nome: string;
        }
    };
    fabrica: {
        empresa: string;
    }
}

export interface ListProps{
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
        id: string;
        cor: string;
        produto_tamanhos_estoque: Array<{
            id: string;
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
    const [selectedFilter, setSelectedFilter] = useState('PRODUTO');

    const [modalProduct, setModalProduct] = useState<ProductApiResponse[]>();
    const [modalVisible, setModalVisible] = useState(false);

    const [modalVisibleAlert, setModalVibleAlert] = useState(false);
    const [alertIdOrder, setAlertIdOrder] = useState('');
    const [titleAlert, setTitleAlert] = useState('Excluir produto');
    const [menssageAlert, setMenssageAlert] = useState('Deseja realmente DELETAR esse produto???');

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
    
    // FUNCAO FECHAR MODAL
    function handleCloseModal(){
        setModalVisible(false);
    }

    //FUNCAO QUE ABRE MODAL DE ALERT
    function alertConfirm(id: string ){
        setAlertIdOrder(id);
        setModalVibleAlert(true);
    }

    // FUNCAO PARA DELETAR PRODUTO
    async function handleDelete(res: string, id: string){
        if(!id){
            toast.success('ALGO DEU ERRADO, ATUALIZE A PAGINA E TENTE NOVAMENTE');
            return;
        }

        if(res === 'sim'){
            // O usuário confirmou a exclusão, então faz a requisição para deletar a fábrica
            await api.delete('produto/delete', {
                params:{
                    produto_id: id,
                }
            })
            .then(() => {
                toast.success('FABRICA DELETADA');
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                toast.error('ALGO DEU ERRADO, ATUALIZE A PAGINA E TENTE NOVAMENTE');
            });
        }else if(res === 'nao'){
            setModalVibleAlert(false)
            return
        }

    }

    // FUNCAO FILTRO 
    function filterFactory(){
        //FILTRANDO SE TEM ID
        if(listId){
            const filterFactory = product.filter((prod) => prod.id.includes(listId));
            setProductList(filterFactory);
        }

        //FILTRANDO PELO NOME
        if(!listId && listName && selectedFilter === 'PRODUTO'){
            const filterFactory = product.filter((prod) => prod.nome_produto.includes(listName));
            setProductList(filterFactory);
        }

        //FILTRANDO PELO SECAO
        if(!listId && listName && selectedFilter === 'SECAO'){
            const filterFactory = product.filter((prod) => prod.secao.nome_secao.includes(listName));
            setProductList(filterFactory);
        }

        //FILTRANDO PELO CATEGORIA
        if(!listId && listName && selectedFilter === 'CATEGORIA'){
            const filterFactory = product.filter((prod) => prod.categoria.nome_categoria.includes(listName));
            setProductList(filterFactory);
        }

        //FILTRANDO PELO REPRESENTANTE
        if(!listId && listName && selectedFilter === 'REPRESENTANTE'){
            const filterFactory = product.filter((prod) => prod.representante.usuario.nome.includes(listName));
            setProductList(filterFactory);
        }

        //FILTRANDO PELO FABRICA
        if(!listId && listName && selectedFilter === 'FABRICA'){
            const filterFactory = product.filter((prod) => prod.fabrica.empresa.includes(listName));
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
        <>
            <Head>

                <title>Sistema - list product</title>
            </Head>
            <div className={styles.container}>
                <Header title={'LISTA PRODUTOS'}/>

                <main className={styles.containerFavorit}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)} style={{width: '300px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <Input placeholder={selectedFilter} value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())} style={{width: '250px'}}/>
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
                                            onClick={() => alertConfirm(prod.id)}
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

                {
                    modalVisibleAlert && (
                        <ModalAlert 
                            isOpen={modalVisibleAlert}
                            onRequestClose={handleDelete}
                            idOrder={alertIdOrder}
                            titleAlert={titleAlert}
                            menssageAlert={menssageAlert}
                        />
                    )
                }
            </div>
        </>
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