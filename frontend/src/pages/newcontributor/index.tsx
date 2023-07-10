import React, { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { FiUpload } from 'react-icons/fi';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

export default function Register(){

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<null | File>(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];
        if(!image){
            return;
        }

        if(image.type === 'image/png' || image.type === 'image/jpeg'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    }


    return(
        <>  
            <div className={styles.container}>
                <Header />

                <main className={styles.containerForm}>
                    <div className={styles.leftContainer}>

                    </div>

                    <div className={styles.rigthContainer}>
                        <h1>CADASTRO DE COLABORADOR</h1>
                        <form className={styles.formColaborador}>
                            <Input placeholder='NOME COMPLETO' type='text' className={styles.inputName}/>

                            <div className={styles.inputsBasicData}>                               
                                <Input placeholder='NASCIMENTO' type='date'/>
                                <Input placeholder='SEXO' type='text'/>
                                <Input placeholder='EMAIL' type='text'/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='CPF' type='text'/>
                                <Input placeholder='RG' type='text'/>
                                <Input placeholder='ORGÃO EMISSOR' type='text'/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='TITULO DE ELEITOR' type='text'/>
                                <Input placeholder='ZONA' type='text'/>
                                <Input placeholder='SEÇAO' type='text'/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='CARTEIRA DE TRABALHO' type='text'/>
                                <Input placeholder='SERIE' type='text'/>
                                <Input placeholder='PIS' type='text'/>
                            </div>

                            <Input placeholder='CEP' type='text'/>

                            <div className={styles.inputsBasicData}>
                                
                                <Input placeholder='LOGRADOURO' type='text' style={{width: '60%'}}/>
                                <Input placeholder='NÚMERO' type='text'/>
                                <Input placeholder='COMPLEMENTO' type='text'/>
                                <Input placeholder='BAIRRO' type='text'/>
                                <Input placeholder='CIDADE' type='text'/>
                                <Input placeholder='UF' type='text' style={{width: '10%'}}/>
                                <Input placeholder='PAIS' type='text'/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='CELULAR' type='text'/>
                                <Input placeholder='TELEFONE' type='text'/>
                            </div>
                            
                            <div className={styles.inputsBasicData}>
                                <Input placeholder='SITUAÇÃO' type='text'/>
                                <Input placeholder='CARGO' type='text'/>
                                <Input placeholder='SENHA' type='text'/>
                            </div>

                            
                            <div className={styles.inputsBasicData}>
                                <Input placeholder='SALARIO BASE' type='text'/>
                                <Input placeholder='COMPLEMENTO - COMISSÃO' type='text'/>
                            </div>

                            <label className={styles.labelAvatar}>
                                <span>
                                    <FiUpload size={25} color='#fff' />
                                </span>
                                <input type="file" accept='image/png, image/jpeg' onChange={handleFile}/>
                                {
                                    avatarUrl && 
                                        <img 
                                            className={styles.previw} 
                                            src={avatarUrl} 
                                            alt="Imagem colaborador" 
                                            width={'100%'}
                                            height={'200px'}
                                        />
                                }
                            </label>

                            <TextArea placeholder='OBS'/>

                            <div className={styles.buttonForm}>
                                <Button type='submit' loading={false} style={{width: '100%', height: '40px'}} >CADASTRAR</Button>
                            </div>
                            
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}