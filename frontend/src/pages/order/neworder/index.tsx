import React, { useContext, useEffect, useState  } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

//MY IMPORTS
import styles from './style.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

type ClienteProps ={
    id: string;
    situacao: boolean;
    usuario:{
        nome: string;
    }
}

type CaixaProps ={
    id: string;
    status: boolean;
    colaborador: {
        id: string;
        usuario:{
            nome: string;
        };
    };
}

interface ListProps{
    cliente: ClienteProps[];
    caixa: CaixaProps[];
}

export default function NewOrder({ cliente, caixa }: ListProps){
    const { user } = useContext(AuthContext);
    const router = useRouter();
    
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState('CLIENTE');
    const [filterId, setFilterId] = useState('');

    const [colaborado_id, setColaboradorId] = useState(user.colaborador_id);
    const [colaboradorName, setColaboradoName] = useState(user.nome);
    const [cliente_id, setClienteId] = useState('');
    const [clienteName, setClienteName] = useState('');
    const [caixa_id, setCaixaId] = useState('');
    const [caixaName, setCaixaName] = useState('');
    //const [buttonFilter, setButtonFilter] = useState('');

    // FUNCAO FILTRO ID
    async function handleFilterId(event: any){
        if (event.keyCode === 13) {

            if(!filterId){
                toast.error('Informe um Id ou faça a busca pelo nome!');
                return;
            }

            if (selectedFilter === 'CLIENTE') {
                const filterCliente = cliente.find(cli => cli.id === filterId);
                if (filterCliente) {
                    setClienteId(filterId);
                    setClienteName(filterCliente.usuario.nome);
                    setFilterId('');
                } else {
                    setFilterId('');
                    toast.error('Cliente não encontrado!');
                }
            }

            if(selectedFilter === 'CAIXA'){
                const filterCaixa = caixa.find(cax => cax.id === filterId);
                const statusCaixa = filterCaixa?.status;
                if (filterCaixa && statusCaixa) {
                    setCaixaId(filterId);
                    setCaixaName(filterCaixa?.colaborador?.usuario?.nome);
                    setFilterId('');
                } else {
                    setFilterId('');
                    toast.error('Caixa não encontrado ou fechado!');   
                }
            }
        }
    } 

    //FUNCAO LISTAR CLIENTE OU CAIXA ABERTO
    function handleFilterCliCax(){
        
    }

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         handleFilterId();
    //     }, 300);

    //     return () => clearTimeout(delayDebounceFn);
    // }, [filterId]);

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }


    return(
        <div className={styles.container}>
                <Header title={'NOVO PEDIDO'}/>

                <main className={styles.containerOrder}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>

                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={filterId} onChange={(e) => setFilterId(e.target.value)} style={{width: '250px'}} onKeyDown={handleFilterId}/>
                            </div>
                            
                            <div className={styles.filter}>
                                <select 
                                    name="product" 
                                    id="product"
                                    value={selectedFilter} 
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className={styles.selectInput}
                                >
                                    <option value="CLIENTE">CLIENTE</option>
                                    <option value="CAIXA">CAIXA</option>
                                </select>

                                <Button type='button' ><FcSearch  size={28}/></Button>
                            </div>                       
                            
                        </div>

                        <div className={styles.dadosOrder}>
                            <span>CLIENTE: {clienteName}</span>
                            <span>|</span>
                            <span>CAIXA: {caixaName}</span>
                        </div>

                        <Button type='submit' loading={loading}
                        style={
                            {width: '500px', 
                            height: '50px', 
                            marginTop: '1rem', 
                            fontSize: '20px'
                            }}>ABRIR PEDIDO
                        </Button>
                        
                        
                    </div>
                </main>
        </div>
    );
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    //@ts-ignore
    const apiOrder = setupAPIClient(ctx);

    const colaborador = await apiOrder.get('representante');
    const cliente = await apiOrder.get('cliente');
    const caixa = await apiOrder.get('caixa');

    return{
      props: {
        colaborador: colaborador.data,
        cliente: cliente.data,
        caixa: caixa.data
      }
    }
});
