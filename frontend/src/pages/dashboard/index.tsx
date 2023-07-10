import React from 'react';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';

export default function dashboard(){

    return(
        <div className={styles.container}>
                <Header />

                <main className={styles.containerFavorit}>
                    <div className={styles.leftContainer}>

                    </div>

                    <div className={styles.rigthContainer}>
                        <h1>FAVORITOS</h1>
                        
                    </div>
                </main>
        </div>
    );
}