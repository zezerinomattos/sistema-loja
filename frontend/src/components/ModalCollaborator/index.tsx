import React from 'react';
import Modal from 'react-modal';

// MY IMPORTS
import styles from './styles.module.scss';
import { CollaboratorDetailProps } from '../../pages/collaborator/listcollaborator';
import { Input, TextArea } from '../Ui/Input';
import { Button } from '../Ui/Button';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    colaborador: CollaboratorDetailProps[];
}

export function ModalCollaborator({ isOpen, onRequestClose, colaborador }: ModalProps){
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
                <h1>DETALHES COLABORADOR</h1>
                {
                    colaborador.map(colab => (
                        <form key={colab.id} className={styles.form}>
                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CÓDIGO</label>
                                    <Input value={colab.id} disabled style={{width: '400px'}}/>
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
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.rg : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">EMISSOR</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.orgao_emissor : ''} disabled style={{width: '80px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">TITULO DE ELEITOR</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.titulo_eleitor : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">ZONA</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.zona_eleitoral : ''} disabled style={{width: '80px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SEÇÃO</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.secao_eleitoral : ''} disabled style={{width: '60px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CART. TRABALHO</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.carteira_trabalho: ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SERIE</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.serie : ''} disabled style={{width: '80px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">PIS</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.pis : ''} disabled style={{width: '120px'}}/>
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

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CELULAR</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.celular: ''} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">TELEFONE</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.telefone : ''} disabled style={{width: '120px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SITUAÇÃO</label>
                                    <Input value={Array.isArray(colab.colaborador) ? (colab.colaborador[0]?.situacao ? "ATIVO" : "INATIVO") : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">CARGO</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.cargo : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">SALARIO BASE</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.cargo : ''} disabled style={{width: '150px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label htmlFor="">COMISSÃO</label>
                                    <Input value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.cargo : ''} disabled style={{width: '150px'}}/>
                                </div>

                            </div>

                            <div className={styles.inputLabel}>
                                <label htmlFor="">OBS</label>
                                <TextArea value={Array.isArray(colab.colaborador) ? colab.colaborador[0]?.obs : ''} disabled />
                            </div>

                        </form>
                    ))
                }
            </div>
        </Modal>
    )
}

//Horario: {new Date(order[0].created_at).toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"})}