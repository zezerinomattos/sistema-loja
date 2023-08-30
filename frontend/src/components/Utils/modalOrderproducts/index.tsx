import React, {useState} from 'react';
import Modal from 'react-modal';

//MY IMPORTS
import styles from './styles.module.scss';
import { ProductDetailProps, ProductApiResponse } from '../../../pages/product/listproduct';

import { Input, TextArea } from '../../Ui/Input';
import { Button } from '../../Ui/Button';

interface ModalOrderProduct{
    isOpen: boolean;
    onRequestClose: (colorId: string, sizeId: string) => void;
    productSelected: ProductApiResponse[];
}

export function ModalOrderProducts({ isOpen, onRequestClose, productSelected }: ModalOrderProduct){
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

    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    function selectColorAndSize(colorId: string, sizeId: string) {
        setColor(colorId);
        setSize(sizeId);

        onRequestClose(colorId, sizeId);
    }

    return(
        <Modal isOpen={isOpen} onRequestClose={() => onRequestClose} style={customStyles}>
            <div className={styles.container}>
                <label htmlFor="">COR</label>
                <div className={styles.infoProduct}>
                    {productSelected[0].produto.produto_cor.map(proCor => (
                        <>
                            <div className={styles.containerSize} key={proCor.id}>
                                <span className={styles.textColor}>{proCor.cor}</span>
                                {
                                    proCor.produto_tamanhos_estoque.map(proTam => (
                                        <div className={styles.productSize} key={proTam.id}>
                                            <input
                                                type="radio"
                                                checked={color !== '' && size === proTam.id}
                                                onChange={() => selectColorAndSize(proCor.id, proTam.id)}
                                                style={{marginLeft: '5px'}}
                                            />
                                            <span className={styles.textSize}>{proTam.tamanho}</span>
                                            <span className={styles.textSize} >{proTam.estoque}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    ))}
                </div>
            </div> 
        </Modal>
    )

}