import React from 'react';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';

export default function dashboard(){

    return(
        <main className={styles.container}>
            <Header />
        </main>
    );
}