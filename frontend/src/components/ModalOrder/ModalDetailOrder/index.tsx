import React, {useState} from 'react';
import Modal from 'react-modal';


//MY IMPORTS
import styles from './styles.module.scss';

import { OrderProps } from '../../../pages/order/listorder';

interface ModalOrderProduct{
    isOpen: boolean;
    onRequestClose: () => void;
    detalOrder: OrderProps[];
}

export function ModalDetailOrder({ isOpen, onRequestClose, detalOrder }: ModalOrderProduct){

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
                <div className={styles.taxCouponConteiner}>
                    <div className={styles.taxCuponTitle}>
                        <h1>DETALHES DO PEDIDO</h1>
                    </div>

                    <div className={styles.taxCuponHeader}>
                        <span style={{width: '150px', justifyContent:'left', marginLeft: '5px'}}>COD</span>
                        <span style={{width: '260px', justifyContent:'left'}}>PRODUTO</span>
                        <span style={{width: '200px', justifyContent:'left'}}>COR</span>
                        <span style={{width: '50px', justifyContent:'left'}}>TAM</span>
                        <span style={{width: '50px'}}>QTDE</span>
                        <span>V. UNIT</span>
                        <span>V. TOTAL</span>
                    </div>
                    <article className={styles.addProduct}>
                        <ol className={styles.list}>
                            {
                                detalOrder.map(order => (
                                    <>
                                        {
                                            order.items.map(item => (
                                                <li key={order.id}>
                                                    <span className={styles.codProduct} style={{ width: '150px', justifyContent: 'left', marginLeft: '5px' }}>
                                                        {item.id}
                                                    </span>
                                                    <span style={{ width: '260px', justifyContent: 'left' }}>{item.produto_name}</span>
                                                    <span style={{ width: '200px', justifyContent: 'left', textTransform: 'uppercase'}}>{item.color_name}</span>
                                                    <span style={{ width: '50px', justifyContent: 'left', textTransform: 'uppercase'}}>{item.size_name}</span>
                                                    <span style={{ width: '50px' }}>{item.qtd}</span>
                                                    <span >{item.preco_unit}</span>
                                                    <span >{item.preco}</span>
                                                </li>
                                            ))
                                        }
                                        <div className={styles.valueOrder}>
                                            <span >
                                                SITUAÇÃO:
                                                    {order.status === false && order.draft === false && ' ABERTO'}
                                                    {order.status === false && order.draft === true && ' RASCUNHO'}
                                                    {order.status === true && order.draft === false && ' FECHADO'}
                                            </span>
                                            <span >|</span>
                                            <span >VAL. TOTAL: R$ {order.valor_total}</span>
                                            <span >|</span>
                                            <span >DESCONTO: {order.desconto}%</span>
                                            <span >|</span>
                                            <span >VAL. PAGO: R$ {order.valor_pagar}</span>
                                        </div>

                                        <div className={styles.dataOrder}>
                                            <div className={styles.infoDate}>
                                                <span >CRIAÇÃO: {new Date(order.created_at).toLocaleDateString()}</span>
                                                <span >ATUALIZAÇÃO: {new Date(order.updated_at).toLocaleDateString()}</span>
                                            </div>
                                            <span >CLIENTE: {order.cliente.usuario.nome}</span>
                                            <span >VENDEDOR: {order.colaborado.usuario.nome}</span>
                                            <span >CAIXA: {order.caixa.colaborador.usuario.nome}</span>
                                        </div>
                                    </>
                                ))
                            }
                        </ol>
                    </article>
                    
                </div>

            </div>
        </Modal>
    )
}