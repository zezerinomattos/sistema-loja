import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Image from 'next/image';


//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

export default function CupomFiscal() {
    const router = useRouter();
    const id = router.query.id; // Acessando o parâmetro Id da URL
    const orderId = id?.toString();
    const { user } = useContext(AuthContext);

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const url = 'http://localhost:3333/files/';

    useEffect(() => {
      //Escondendo o loading quando ele montar completamente o componente
      setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }
  
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
                  <Input type='text' id='name' placeholder='Produto' disabled />
                </div>

                <div className={styles.cartContainer}>
                  <div className={styles.productConteiner}>
                    <div className={styles.product}>
                      {/* <Image src={url + '/' + prod.produto.foto} alt='Imagem produto' width={80} height={100}/> */}
                      <Image src={url + '/' + 'd379453d1bba09f4b7fcf039fe735219-camiseta-nike-preta.jpg'} alt='Imagem produto' width={180} height={210} className={styles.imgProduct}/> 

                      <div className={styles.inputContainer}>
                        <div className={styles.input}>
                          <label htmlFor="cod" className={styles.labelInput}>CÓDIGO</label>
                          <Input type='text' id='cod' />
                        </div>

                        <div className={styles.input}>
                          <label htmlFor="qtd" className={styles.labelInput}>QUANTIDADE</label>
                          <Input type='number' id='qtd' placeholder='0' />
                        </div>

                        <div className={styles.input}>
                          <label htmlFor="valUnit" className={styles.labelInput}>VALOR UNIT.</label>
                          <Input type='text' id='valUnit' placeholder='0' disabled />
                        </div>

                        <div className={styles.input}>
                          <label htmlFor="valTot" className={styles.labelInput}>VALOR TOTAL.</label>
                          <Input type='text' id='valTot' placeholder='0' disabled/>
                        </div>
                      </div>
                    </div>

                    <h5>Menu</h5>

                    <div className={styles.containerMenu}>
                      <div className={styles.menu}>
                        <span>F2 - Pesquisar Produtos</span>
                        <span>F3 - Excluir Produtos</span>
                        <span>F4 - Alterar Quantidade</span>
                      </div>

                      <div className={styles.menu}>
                        <span>F5 - Cancelar Venda</span>
                        <span>F6 - Finalizar Venda</span>
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
                  </div>
                </div>
              </form>
            </div>
        </main>
      </div>
    );
}

