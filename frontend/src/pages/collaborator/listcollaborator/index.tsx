import React from 'react';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '../../../components/Header';

export default function ListCollaborator(){
    return(
        <div className={styles.container}>
            <Header />
        </div>
    );
}