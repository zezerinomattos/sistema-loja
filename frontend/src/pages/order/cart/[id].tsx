import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Modal from 'react-modal';


//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';
import { ModalListProductos } from '../../../components/ModalOrder/ModalListProductos';
import { ModalDeleteItem } from '../../../components/ModalOrder/ModalDeleteItem';
import imgplaceholder from '../../../../public/placeholder.png'

import { ProductDetailProps, ProductApiResponse} from '../../product/listproduct';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

export type ProductProps = {
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
  lisProduct: ProductProps[];
}

type ItemAddProps = {
  item: {
    id: string;
    qtd: number;
    preco: number;
    order_id: string;
    produto_id: string;
    cor_id: string;
    tamanho_id: string;
  }
  precoTotalItem: number;
  desconto_atual: number;
  desconto_maximo: number;
  produtoEstoque: {
    id: string;
    tamanho: string;
    estoque: number;
    produtoCor_id: string;
  }
  produtoInfo:{
    nome_produto: string;
    preco_venda: string;
  }
}

export default function CupomFiscal({ lisProduct }: ListProps) {
    const router = useRouter();
    const id = router.query.id; // Acessando o parâmetro Id da URL
    const orderId = id?.toString();
    const { user } = useContext(AuthContext);

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const [selectedProductId, setSelectedProductId] = useState('');
    const [selectedColorId ,setSelectedColorId] = useState('');
    const [selectedSizeId, setSelectedSize] = useState('');
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [selectedName, setSelectedName] = useState('');
    // Estado para rastrear o valor total dos itens
    const [totalItemsValue, setTotalItemsValue] = useState<number>(0);

    const [responseItemAdd, setResponseItemAdd] = useState<ItemAddProps[]>([]);
    const [addedItems, setAddedItems] = useState<ItemAddProps[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalProduct, setModalProduct] = useState<ListProps[]>();

    const [modalVisibleDelete, setModalVibleDelete] = useState(false);

    const url = 'http://localhost:3333/files/';
    const [imgProduct, setImgProduct] = useState('');

    //FUNCAO PARA MENU TECLAS PRCIONADAS
    const handleKeyDown = async (event: KeyboardEvent) => {
      //FUNCAO PARA LISTAR PRODUTOS E ABRIR O MODAL
      if (event.key === 'P' && event.shiftKey) {
        const list: ListProps[] = lisProduct.map(prod => ({ lisProduct: [prod] })); 
        setModalProduct(list);
        setModalVisible(true);
      }

      //FUNCAO PARA EXCLUIR ITEM DE PRODUTO
      if (event.key === 'X' && event.shiftKey) {
        setModalVibleDelete(true);
      }
    };

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    // FUNCAO FECHAR MODAL LISTA PRODUTO
    function handleCloseModal(colorId: string, sizeId: string, productId: string, selectedName: string, selectedPrice: number, imgProduct: string){
      setSelectedProductId(productId);
      setSelectedColorId(colorId);
      setSelectedSize(sizeId);
      setSelectedPrice(selectedPrice);
      setSelectedName(selectedName);
      setImgProduct(imgProduct)

      setModalVisible(false);
    }

    // FUNCAO FECHAR MODAL DELETE ITEM
    function handleCloseModalDeleteItem(itemId: string){
      alert(itemId);
      setModalVibleDelete(false);
    }

    //CALCULO DE VALOR TOTAL DE PRODUTO
    useEffect(() => {
      if (selectedProductId !== '') { // Alterado de null para uma string vazia
          const total = selectedPrice * amount; 
          setTotalPrice(total);
      }
  }, [selectedPrice, amount]);

  //FUNCAO QUE ADICIONA ITEM NO BANCO E CUPOM FISCAL
  const handleQuantityInputKeyPress = async(event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if(!amount || amount < 1){
        toast.error('INFORME A QUANTIDADE DO PRODUTO!');
        return;
      }

      await api.post('/add/order', {
        qtd: amount,
        order_id: orderId,
        produto_id: selectedProductId,
        cor_id: selectedColorId,
        tamanho_id: selectedSizeId
      })
      .then(response => {
        const newItem: ItemAddProps = response.data;
        setAddedItems([...addedItems, newItem]);
        setResponseItemAdd([...addedItems, newItem]); // Atualize responseItemAdd também

        setTotalItemsValue(totalItemsValue + newItem.precoTotalItem);
        toast.success('ITEM ADICIONADO!');

        setSelectedProductId('');
        setSelectedColorId('');
        setSelectedSize('');
        setAmount(0);
        setSelectedName('');
        setTotalPrice(0);
        setSelectedPrice(0);

      })
      .catch(error => {
        console.log(error);
        toast.error(error.response.data.erro);

        setSelectedProductId('');
        setSelectedColorId('');
        setSelectedSize('');
        setAmount(0);
        setSelectedName('');
        setTotalPrice(0);
        setSelectedPrice(0);
      });
      
    }
  } 

    useEffect(() => {
      //Escondendo o loading quando ele montar completamente o componente
      setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    Modal.setAppElement('#__next');
  
    return (
      <div className={styles.container}>
        <Header title={'CUPOM FISCAL'} id={orderId}/>

        <main className={styles.containerBody}>
            <Presentation />

            <div className={styles.rigthContainer}>
              {/* <h1 style={{color: '#FFF'}}>{id}</h1> */}
              <form className={styles.container}>
                <div className={styles.nameContainer}>
                  <label htmlFor="name">NOME DO PRODUTO</label>
                  <Input value={selectedName} type='text' id='name' placeholder='Produto' disabled />
                </div>

                <div className={styles.cartContainer}>
                  <div className={styles.productConteiner}>
                    <div className={styles.product}>
                      {/* <Image src={url + '/' + imgProduct} alt='Imagem produto' width={80} height={100}/> */}
                      <Image src={imgProduct ? `${url}/${imgProduct}` : imgplaceholder} alt='Imagem produto' width={180} height={210} className={styles.imgProduct}/> 

                      <div className={styles.inputContainer}>
                        <div className={styles.input}>
                          <label htmlFor="cod" className={styles.labelInput}>CÓDIGO</label>
                          <Input type='text' id='cod' disabled value={selectedProductId}/>
                        </div>

                        <div className={styles.input}>
                          <label htmlFor="qtd" className={styles.labelInput}>QUANTIDADE</label>
                          <Input 
                            type='number' 
                            id='qtd' 
                            placeholder='0' 
                            value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                            onKeyDown={handleQuantityInputKeyPress}
                          />
                          {/* <Button type='submit' loading={loading} >ENTRAR</Button> */}
                        </div>

                        <div className={styles.input}>
                          <label htmlFor="valUnit" className={styles.labelInput}>VALOR UNIT.</label>
                          <Input value={`R$ ${selectedPrice.toFixed(2)}`} type='text' id='valUnit' placeholder='0' disabled />
                        </div>

                        <div className={styles.input}>
                          <label htmlFor="valTot" className={styles.labelInput}>VALOR TOTAL.</label>
                          <Input value={`R$ ${totalPrice.toFixed(2)}`} type='text' id='valTot' placeholder='0' disabled/>
                        </div>
                      </div>
                    </div>

                    <h5>Menu</h5>

                    <div className={styles.containerMenu}>
                      <div className={styles.menu}>
                        <span>Shif + P - Pesquisar Prod.</span>
                        <span>Shif + X- Excluir Item</span>
                        <span>Shif + A - Alterar Quant.</span>
                      </div>

                      <div className={styles.menu}>
                        <span>Shif + C - Cancel. Venda</span>
                        <span>Shif + F - Finalizar Venda</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.taxCouponConteiner}>
                    <div className={styles.taxCuponTitle}>
                      <h1>LISTA DE PRODUTOS</h1>
                    </div>

                    <div className={styles.taxCuponHeader}>
                      <span style={{width: '150px', justifyContent:'left'}}>COD</span>
                      <span style={{width: '260px', justifyContent:'left'}}>PRODUTO</span>
                      <span style={{width: '50px'}}>QTDE</span>
                      <span>V. UNIT</span>
                      <span>V. TOTAL</span>
                    </div>

                    <article className={styles.addProduct}>
                      <ol className={styles.list}>
                      {addedItems.map((item) => (
                        <li key={item.item.id}>
                          <span className={styles.codProduct} style={{ width: '150px', justifyContent: 'left' }}>
                            {item.item.id}
                          </span>
                          <span style={{ width: '260px', justifyContent: 'left' }}>{item.produtoInfo.nome_produto}</span>
                          <span style={{ width: '50px' }}>{item.item.qtd}</span>
                          <span>{`R$ ${item.item.preco}`}</span>
                          <span>{`R$ ${item.precoTotalItem}`}</span>
                        </li>
                      ))}
                      </ol>

                      {/* VALOR TOTAL DE ITENS */}
                      <div className={styles.valueOrderContainer}>
                        <div className={styles.valueItens}>
                          <label className={styles.itensLabel}>Itens</label>
                          <span className={styles.itensValue}>{addedItems.length}</span>
                        </div>

                        <div className={`${styles.totalValue} ${styles.valueItens}`}>
                          <label className={styles.itensLabel}>Sub Total</label>
                          <span className={styles.itensValue}>{`R$ ${totalItemsValue.toFixed(2)}`}</span>
                        </div>
                      </div>
                    </article>
                  </div>

                </div>
              </form>
            </div>
        </main>
        {
          modalVisible && modalProduct &&(
            <ModalListProductos 
              isOpen={modalVisible}
              onRequestClose={handleCloseModal}
              productLyList={modalProduct}
            />
          )
        }

        {
          modalVisibleDelete && addedItems &&(
            <ModalDeleteItem 
              isOpen={modalVisibleDelete}
              onRequestClose={handleCloseModalDeleteItem}
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
          lisProduct: response.data
      }
  }
})