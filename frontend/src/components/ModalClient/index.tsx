import React from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

// MY IMPORTS
import styles from './styles.module.scss';
import { ClientDetailProps } from '../../pages/client/listclient';
import { Input, TextArea } from '../Ui/Input';
import { Button } from '../Ui/Button';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    client: ClientDetailProps[];
}

export function ModalClient({ isOpen, onRequestClose, client }: ModalProps){

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
                    client.map(colab => (
                        <form key={Array.isArray(colab.cliente) ? colab.cliente[0]?.id : ''} className={styles.form}>
                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CÓDIGO</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.id : ''} disabled style={{width: '400px', textTransform: 'none'}} />
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">NOME</label>
                                    <Input value={colab.nome} disabled style={{width: '400px'}}/>
                                </div>

                            </div>

                            <div className={styles.inputsBasicData}>
                                
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">NASCIMENTO</label>
                                    <Input value={new Date(colab.nascimento).toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SEXO</label>
                                    <Input value={colab.sexo} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">EMAIL</label>
                                    <Input value={colab.email} disabled style={{width: '300px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CPF</label>
                                    <Input value={colab.cpf} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">RG</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.rg : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">EMISSOR</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.orgao_emissor : ''} disabled style={{width: '80px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CELULAR</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.celular: ''} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">TELEFONE</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.telefone : ''} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">PROFISSÃO</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.profissao : ''} disabled style={{width: '140px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">EMPRESA</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.empresa : ''} disabled style={{width: '250px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">RENDA FIXA</label>
                                    <Input value={`R$ ${Array.isArray(colab.cliente) ? colab.cliente[0]?.renda_fixa : ''}`} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">COMP. RENDA</label>
                                    <Input value={`R$ ${Array.isArray(colab.cliente) ? colab.cliente[0]?.complemento_renda : ''}`} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SCORE</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.score : ''} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">LIMITE CREDITO</label>
                                    <Input value={`R$ ${Array.isArray(colab.cliente) ? colab.cliente[0]?.limite_credito : ''}`} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">LIMITE CREDITO</label>
                                    <Input value={`R$ ${Array.isArray(colab.cliente) ? colab.cliente[0]?.limite_credito : ''}`} disabled style={{width: '120px'}}/>
                                </div>
                                
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CEP</label>
                                    <Input value={colab.endereco.cep} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">LOGRADOURO</label>
                                    <Input value={colab.endereco.logradouro} disabled style={{width: '370px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">NÚMERO</label>
                                    <Input value={colab.endereco.numero} disabled style={{width: '80px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">COMPLEMENTO</label>
                                    <Input value={colab.endereco.complemento} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">BAIRRO</label>
                                    <Input value={colab.endereco.bairro} disabled style={{width: '250px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CIDADE</label>
                                    <Input value={colab.endereco.cidade} disabled style={{width: '250px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">UF</label>
                                    <Input value={colab.endereco.uf} disabled style={{width: '55px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">PAIS</label>
                                    <Input value={colab.endereco.pais} disabled style={{width: '150px'}}/>
                                </div>

                            </div>

                            <div  className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">REFERENCIA 01</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.nome_referencia1 : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">TELEFONE 01</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.telefone_referencia1 : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">REFERENCIA 02</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.nome_referencia2 : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">TELEFONE 02</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.telefone_referencia2 : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">REFERENCIA 03</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.nome_referencia3 : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">TELEFONE 03</label>
                                    <Input value={Array.isArray(colab.cliente) ? colab.cliente[0]?.telefone_referencia3 : ''} disabled style={{width: '150px'}}/>
                                </div>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">ÚLTIMA COMPRA</label>
                                    <Input value={new Date(Array.isArray(colab.cliente) ? colab.cliente[0]?.ultima_compra : '').toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SITUAÇÃO</label>
                                    <Input value={Array.isArray(colab.cliente) ? (colab.cliente[0]?.situacao ? "ATIVO" : "INATIVO") : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CREATED</label>
                                    <Input value={new Date(Array.isArray(colab.cliente) ? colab.cliente[0]?.created_at : '').toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">UPDATED</label>
                                    <Input value={new Date(Array.isArray(colab.cliente) ? colab.cliente[0]?.updated_at : '').toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>
                            </div>

                            <div className={styles.inputLabel}>
                                <div className={styles.foto}>
                                    <Image src={url + '/' + colab.foto} alt='Logo da empresa' width={100} height={100} />
                                </div>
                            </div>

                            <div className={styles.inputLabel}>
                                <label htmlFor="">OBS</label>
                                <TextArea value={Array.isArray(colab.cliente) ? colab.cliente[0]?.obs : ''} disabled />
                            </div>

                        </form>
                    ))
                }
            </div>
        </Modal>
    )
}
