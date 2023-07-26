import React from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

// MY IMPORTS
import styles from './styles.module.scss';
import { RepresentativeDetailProps } from '../../pages/representative/listrepresentative';
import { Input, TextArea } from '../Ui/Input';
import { Button } from '../Ui/Button';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    representative: RepresentativeDetailProps[];
}

export function ModalRepresentative({ isOpen, onRequestClose, representative }: ModalProps){

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
                    representative.map(rep => (
                        <form key={Array.isArray(rep.representante) ? rep.representante[0]?.id : ''} className={styles.form}>
                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CÓDIGO</label>
                                    <Input value={Array.isArray(rep.representante) ? rep.representante[0]?.id : ''} disabled style={{width: '400px', textTransform: 'none'}} />
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">NOME</label>
                                    <Input value={rep.nome} disabled style={{width: '400px'}}/>
                                </div>

                            </div>

                            <div className={styles.inputsBasicData}>
                                
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">NASCIMENTO</label>
                                    <Input value={new Date(rep.nascimento).toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SEXO</label>
                                    <Input value={rep.sexo} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">EMAIL</label>
                                    <Input value={rep.email} disabled style={{width: '300px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CPF</label>
                                    <Input value={rep.cpf} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">EMPRESA</label>
                                    <Input value={Array.isArray(rep.representante) ? rep.representante[0]?.empresa : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CELULAR</label>
                                    <Input value={Array.isArray(rep.representante) ? rep.representante[0]?.celular : ''} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">TELEFONE</label>
                                    <Input value={Array.isArray(rep.representante) ? rep.representante[0]?.telefone : ''} disabled style={{width: '120px'}}/>
                                </div>
                                
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CEP</label>
                                    <Input value={rep.endereco.cep} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">LOGRADOURO</label>
                                    <Input value={rep.endereco.logradouro} disabled style={{width: '370px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">NÚMERO</label>
                                    <Input value={rep.endereco.numero} disabled style={{width: '80px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">COMPLEMENTO</label>
                                    <Input value={rep.endereco.complemento} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">BAIRRO</label>
                                    <Input value={rep.endereco.bairro} disabled style={{width: '250px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CIDADE</label>
                                    <Input value={rep.endereco.cidade} disabled style={{width: '250px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">UF</label>
                                    <Input value={rep.endereco.uf} disabled style={{width: '55px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">PAIS</label>
                                    <Input value={rep.endereco.pais} disabled style={{width: '150px'}}/>
                                </div>

                            </div>

                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SITUAÇÃO</label>
                                    <Input value={Array.isArray(rep.representante) ? (rep.representante[0]?.status ? "ATIVO" : "INATIVO") : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CREATED</label>
                                    <Input value={new Date(Array.isArray(rep.representante) ? rep.representante[0]?.created_at : '').toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">UPDATED</label>
                                    <Input value={new Date(Array.isArray(rep.representante) ? rep.representante[0]?.updated_at : '').toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                                </div>
                            </div>

                            <div className={styles.inputLabel}>
                                <div className={styles.foto}>
                                    <Image src={url + '/' + rep.foto} alt='Logo da empresa' width={100} height={100} />
                                </div>
                            </div>

                            <div className={styles.inputLabel}>
                                <label htmlFor="">OBS</label>
                                <TextArea value={Array.isArray(rep.representante) ? rep.representante[0]?.obs : ''} disabled />
                            </div>

                        </form>
                    ))
                }
            </div>
        </Modal>
    )
}