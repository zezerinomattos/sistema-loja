import React from 'react';
import { useRouter } from 'next/router';

//MY IMPORTS
import styles from './styles.module.scss';

export default function CupomFiscal() {
    const router = useRouter();
    const id = router.query.id; // Acessando o parâmetro orderId da URL
  
    return (
      <div>
        <h1 style={{color: '#FFF'}}>Cupom</h1>
        <span style={{color: '#FFF'}}>{id}</span>
      </div>
    );
}

