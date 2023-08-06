import React from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

// MY IMPORTS
import styles from './styles.module.scss';
import { ProductDetailProps, ProductApiResponse } from '../../pages/product/listproduct';
import { Input, TextArea } from '../Ui/Input';
import { Button } from '../Ui/Button';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    product: ProductApiResponse[];
}

export function ModalProduct({ isOpen, onRequestClose, product }: ModalProps){

    const url = 'http://localhost:3333/files/';

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
    
    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <div className={styles.container}>
                <h1>DETALHES DO CLIENTE</h1>
                {
                    product.map(prod => (
                        <form key={prod.produto.id} className={styles.form}>
                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CÓDIGO</label>
                                    <Input value={prod.produto.id} disabled style={{width: '400px', textTransform: 'none'}} />
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">PRODUTO</label>
                                    <Input value={prod.produto.nome_produto} disabled style={{width: '400px'}}/>
                                </div>

                            </div>

                            <div className={styles.inputsBasicData}>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SEÇÃO</label>
                                    <Input value={prod.produto.secao.nome_secao} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CATEGORIA</label>
                                    <Input value={prod.produto.categoria.nome_categoria} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">MARCA</label>
                                    <Input value={prod.produto.marca} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">MATERIAL</label>
                                    <Input value={prod.produto.material} disabled style={{width: '250px'}}/>
                                </div>                               
                                
                            </div>
                            

                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">REPRESENTANTE</label>
                                    <Input value={prod.produto.representante.usuario.nome} disabled style={{width: '250px'}}/>
                                </div>   

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">FABRICA</label>
                                    <Input value={prod.produto.fabrica.empresa} disabled style={{width: '250px'}}/>
                                </div>  
                            </div>

                            <div className={styles.inputLabel}>
                                <label htmlFor="">DESCRIÇÃO</label>
                                <TextArea value={prod.produto.descricao} disabled />
                            </div>

                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">COR</label>
                                    {prod.produto.produto_cor.map(proCor => (
                                        <>
                                            <Input value={proCor.cor} disabled style={{width: '190px'}}/>
                                            {
                                                proCor.produto_tamanhos_estoque.map(proTam => (
                                                    <div className={styles.inputsBasicData}>
                                                        {/* <Input value={proCor.cor} disabled style={{width: '150px'}}/> */}
                                                        <Input value={proTam.tamanho} disabled style={{width: '70px'}}/>
                                                        <Input value={proTam.estoque} disabled style={{width: '50px'}}/>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    ))}
                                </div> 
                            </div>

                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CUSTO</label>
                                    <Input value={`R$ ${prod.produto.custo}`} disabled style={{width: '100px'}}/>
                                </div>   

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">% DE VENDA</label>
                                    <Input value={`${prod.produto.porcentagem_venda}%`} disabled style={{width: '100px'}}/>
                                </div>  

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">PREÇO</label>
                                    <Input value={`R$ ${prod.produto.preco_venda}`} disabled style={{width: '100px'}}/>
                                </div>   

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">LUCRO</label>
                                    <Input value={`R$ ${prod.produto.margem_lucro}`} disabled style={{width: '100px'}}/>
                                </div>  
                            </div>

                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">DESC. ATUAL</label>
                                    <Input value={`${prod.produto.desconto_atual}%`} disabled style={{width: '100px'}}/>
                                </div>   

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">DESC. MAXIMO</label>
                                    <Input value={`${prod.produto.desconto_maximo}%`} disabled style={{width: '100px'}}/>
                                </div>  
                            </div>


                            <div className={styles.inputsBasicData}>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CREATED</label>
                                    <Input value={new Date(prod.produto.created_at).toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">UPDATED</label>
                                    <Input value={new Date(prod.produto.updated_at).toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>
                            </div>

                            <div className={styles.inputLabel}>
                                <div className={styles.foto}>
                                    <Image src={url + '/' + prod.produto.foto} alt='Logo da empresa' width={180} height={180} />
                                </div>
                            </div>

                        </form>
                    ))
                }
            </div>
        </Modal>
    )
}
