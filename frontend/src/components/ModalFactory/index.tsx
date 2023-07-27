import React from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

// MY IMPORTS
import styles from './styles.module.scss';
import { FactoryDetailProps } from '../../pages/factory/listfactory';
import { Input, TextArea } from '../Ui/Input';
import { Button } from '../Ui/Button';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    factory: FactoryDetailProps[];
}

export function ModalFactory({ isOpen, onRequestClose, factory }: ModalProps){

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
                <h1>DETALHES DE FABRICA</h1>
                {
                    factory.map(fac => (
                        <form key={fac.id} className={styles.form}>
                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CÓDIGO</label>
                                    <Input value={fac.id} disabled style={{width: '400px', textTransform: 'none'}} />
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">EMPRESA</label>
                                    <Input value={fac.empresa} disabled style={{width: '400px', textTransform: 'none'}} />
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CNPJ</label>
                                    <Input value={fac.cnpj} disabled style={{width: '400px'}}/>
                                </div>

                            </div>

                            <div className={styles.inputsBasicData}>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">INSCRIÇÃO ESTADUAL</label>
                                    <Input value={fac.ie} disabled style={{width: '220px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">RAZÃO SOCIAL</label>
                                    <Input value={fac.razaosocial} disabled style={{width: '320px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CONTATO</label>
                                    <Input value={fac.contato} disabled style={{width: '120px'}}/>
                                </div>
                                
                            </div>

                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">REPRESENTANTE</label>
                                    <Input value={fac.representante.usuario.nome} disabled style={{width: '250px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CELULAR REPRE.</label>
                                    <Input value={fac.representante.celular} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">TELEFONE REPRE.</label>
                                    <Input value={fac.representante.telefone} disabled style={{width: '120px'}}/>
                                </div> 
                            </div>

                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CREATED</label>
                                    <Input value={new Date(fac.created_at).toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">UPDATED</label>
                                    <Input value={new Date(fac.updated_at).toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>  
                            </div>

                        </form>
                    ))
                }
            </div>
        </Modal>
    )
}