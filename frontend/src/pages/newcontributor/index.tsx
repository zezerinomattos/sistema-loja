import React, { useState } from 'react';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

export default function Register(){
    return(
        <>  
            <div className={styles.container}>
                <Header />

                <main className={styles.containerForm}>
                    <div className={styles.leftContainer}>

                    </div>

                    <div className={styles.rigthContainer}>
                        <h1>CADASTRO DE COLABORADOR</h1>
                        <form >
                            
                            
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}