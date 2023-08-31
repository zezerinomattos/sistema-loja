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

    const [modalVisible, setModalVisible] = useState(false);
    const [modalProduct, setModalProduct] = useState<ListProps[]>();

    const url = 'http://localhost:3333/files/';

    //FUNCAO PARA LISTAR PRODUTOS E ABRIR O MODAL
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === 'P' && event.shiftKey) {
        const list: ListProps[] = lisProduct.map(prod => ({ lisProduct: [prod] })); 
        setModalProduct(list);
        setModalVisible(true);
      }

    };
    
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    // FUNCAO FECHAR MODAL
    function handleCloseModal(colorId: string, sizeId: string, productId: string, selectedName: string, selectedPrice: number){
      setSelectedProductId(productId);
      setSelectedColorId(colorId);
      setSelectedSize(sizeId);
      setSelectedPrice(selectedPrice);
      setSelectedName(selectedName);

      setModalVisible(false);
    }

    useEffect(() => {
      if (selectedProductId !== '') { // Alterado de null para uma string vazia
          const total = selectedPrice * amount; // Não é necessário parseInt para um número
          setTotalPrice(total);
      }
  }, [selectedPrice, amount]);

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
                      {/* <Image src={url + '/' + prod.produto.foto} alt='Imagem produto' width={80} height={100}/> */}
                      <Image src={url + '/' + 'd379453d1bba09f4b7fcf039fe735219-camiseta-nike-preta.jpg'} alt='Imagem produto' width={180} height={210} className={styles.imgProduct}/> 

                      <div className={styles.inputContainer}>
                        <div className={styles.input}>
                          <label htmlFor="cod" className={styles.labelInput}>CÓDIGO</label>
                          <Input type='text' id='cod' disabled value={selectedProductId}/>
                        </div>

                        <div className={styles.input}>
                          <label htmlFor="qtd" className={styles.labelInput}>QUANTIDADE</label>
                          <Input type='number' id='qtd' placeholder='0' value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
                        </div>

                        <div className={styles.input}>
                          <label htmlFor="valUnit" className={styles.labelInput}>VALOR UNIT.</label>
                          <Input value={`R$ ${selectedPrice}`} type='text' id='valUnit' placeholder='0' disabled />
                        </div>

                        <div className={styles.input}>
                          <label htmlFor="valTot" className={styles.labelInput}>VALOR TOTAL.</label>
                          <Input value={`R$ ${totalPrice}`} type='text' id='valTot' placeholder='0' disabled/>
                        </div>
                      </div>
                    </div>

                    <h5>Menu</h5>

                    <div className={styles.containerMenu}>
                      <div className={styles.menu}>
                        <span>Shif + P - Pesquisar Prod.</span>
                        <span>Shif + X- Excluir Prod.</span>
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
                        <li>
                          <span className={styles.codProduct} style={{width: '150px', justifyContent:'left'}}>893a893b-1606-45d9-aaea-5d937a92d0dc</span>
                          <span style={{width: '260px', justifyContent:'left'}}>CAMISETA  PASSEIO NIKE</span>
                          <span style={{width: '50px'}}>1</span>
                          <span>{`R$ 78,98`}</span>
                          <span>{`R$ 78,98`}</span>
                        </li>

                        <li>
                          <span className={styles.codProduct} style={{width: '150px', justifyContent:'left'}}>893a893b-1606-45d9-aaea-5d937a92d0dc</span>
                          <span style={{width: '260px', justifyContent:'left'}}>CAMISETA  PASSEIO NIKE</span>
                          <span style={{width: '50px'}}>1</span>
                          <span>{`R$ 78,98`}</span>
                          <span>{`R$ 78,98`}</span>
                        </li>

                        <li>
                          <span className={styles.codProduct} style={{width: '150px', justifyContent:'left'}}>893a893b-1606-45d9-aaea-5d937a92d0dc</span>
                          <span style={{width: '260px', justifyContent:'left'}}>CAMISETA  PASSEIO NIKE</span>
                          <span style={{width: '50px'}}>1</span>
                          <span>{`R$ 78,98`}</span>
                          <span>{`R$ 78,98`}</span>
                        </li>

                        <li>
                          <span className={styles.codProduct} style={{width: '150px', justifyContent:'left'}}>893a893b-1606-45d9-aaea-5d937a92d0dc</span>
                          <span style={{width: '260px', justifyContent:'left'}}>CAMISETA  PASSEIO NIKE</span>
                          <span style={{width: '50px'}}>1</span>
                          <span>{`R$ 78,98`}</span>
                          <span>{`R$ 78,98`}</span>
                        </li>

                        <li>
                          <span className={styles.codProduct} style={{width: '150px', justifyContent:'left'}}>893a893b-1606-45d9-aaea-5d937a92d0dc</span>
                          <span style={{width: '260px', justifyContent:'left'}}>CAMISETA  PASSEIO NIKE</span>
                          <span style={{width: '50px'}}>1</span>
                          <span>{`R$ 78,98`}</span>
                          <span>{`R$ 78,98`}</span>
                        </li>
                        
                      </ol>
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