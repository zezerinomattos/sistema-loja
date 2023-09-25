import React, { useContext, useEffect, useState, FormEvent } from 'react';
import Head from 'next/head';
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
    const [listName, setListName] = useState('');

    const [clienteList, setClienteList] = useState(cliente || []);
    const [caixaList, setCaixaList] = useState(caixa || []);


    //const [colaborado_id, setColaboradorId] = useState(user.colaborador_id);
    //const [colaboradorName, setColaboradoName] = useState(user.nome);
    const [cliente_id, setClienteId] = useState('');
    const [clienteName, setClienteName] = useState('');
    const [caixa_id, setCaixaId] = useState('');
    const [caixaName, setCaixaName] = useState('');

    const [active, setActive] = useState(false);

    //FUNCAO DE LI ATIVO
    function handleLiActive(id: string){
        setClienteId(id);
    }

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

    // FUNCAO FILTRO 
    function handlefilterCliCax(){
        //FILTRANDO SE TEM ID CLIENTE
        if(filterId && selectedFilter === 'CLIENTE'){
            const filterCliente = cliente.filter((cli) => cli?.id.includes(filterId));
            setClienteList(filterCliente);
            listFilterCliCax();
        }

        //FILTRANDO PELO NOME CLIENTE
        if(!filterId && listName && selectedFilter === 'CLIENTE'){
            const filterCliente = cliente.filter((cli) => cli?.usuario?.nome.includes(listName));
            setClienteList(filterCliente);
            listFilterCliCax();
        }

        //FILTRANDO SE TEM ID CAIXA
        if(filterId && selectedFilter === 'CAIXA'){
            const filterCaixa = caixa.filter((cxa) => cxa?.id.includes(filterId));
            setCaixaList(filterCaixa);
            listFilterCliCax();
        }

        //FILTRANDO PELO NOME CAIXA
        if(!filterId && listName && selectedFilter === 'CAIXA'){
            const filterCaixa = caixa.filter((cxa) => cxa?.colaborador.usuario?.nome.includes(listName));
            setCaixaList(filterCaixa);
            listFilterCliCax();
        }

        //FILTRANDO TODOS
        if(!listName && !filterId){
            clearFilter();
        }
    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setClienteList(cliente);
        setCaixaList(caixa);
        setFilterId('');
        setListName('');
    }

    //FUNCAO LISTAR CLIENTE OU CAIXA ABERTO
    function listFilterCliCax(){
        if (selectedFilter === 'CLIENTE') {
            // Renderiza a lista de clientes
            return (
                <ol className={styles.list}>
                    {clienteList.map(cli => (
                        <li key={cli.id} className={cli.id === cliente_id ? styles.active : ''}>
                            <span className={styles.idDetail}>{cli.id}</span>
                            <span onClick={() => handleLiActive(cli.id)} className={styles.nameDetail}>{cli.usuario.nome}</span>
                            {/* <span onClick={() => setClienteId(cli.id)} className={styles.nameDetail}>{cli.usuario.nome}</span> */}
                            <span>{cli.situacao ? 'ATIVO' : 'INATIVO'}</span>          
                        </li>
                    ))}
                </ol>
            );
        } else if (selectedFilter === 'CAIXA') {
            // Renderiza a lista de caixas
            return (
                <ol className={styles.list}>
                    {caixaList.map(cax => (
                        <li key={cax.id} className={cax.id === caixa_id ? styles.active : ''} >
                            <span className={styles.idDetail}>{cax.id}</span>
                            <span onClick={() => setCaixaId(cax.id)} className={styles.nameDetail}>{cax.colaborador?.usuario?.nome}</span>
                            <span>{cax?.status ? 'ABERTO' : 'FECHADO'}</span>          
                        </li>
                    ))}
                </ol>
            );
        }
    
        // Retorna null quando nenhum filtro está selecionado
        return null;
    }

    //FUNCAO DE REGISTRO DE ORDER
    async function handleRegisterOrder(event: FormEvent){
        event.preventDefault();

        try {
            await api.post('/order', {
                colaborado_id: user.colaborador_id,
                cliente_id: cliente_id,
                caixa_id: caixa_id,
            })
            .then(response => {
                toast.success('PEDIDO ABERTO!');
                //router.push(`/order/cart/${response.data.order.id}`);
                const id = response.data.id;
                router.push(`/order/cart/${id}`);

                setCarregando(true);
            })

        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.erro);
            setLoaging(false);
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handlefilterCliCax();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [filterId, listName]);

    //CARREGANDO NOME DE CLIENTE E CAIXA DA LISTA
    function loadingList(){
        if (selectedFilter === 'CLIENTE') {
            const filterCliente = cliente.find(cli => cli.id === cliente_id);
            if (filterCliente) {
                setClienteName(filterCliente.usuario.nome);
                setFilterId('');
            }
        }

        if(selectedFilter === 'CAIXA'){
            const filterCaixa = caixa.find(cax => cax.id === caixa_id);
            const statusCaixa = filterCaixa?.status;
            if (filterCaixa && statusCaixa) {
                setCaixaName(filterCaixa?.colaborador?.usuario?.nome);
                setFilterId('');
            }
        }
    }
    useEffect(() => {
        loadingList()
    }, [caixa_id, cliente_id]);

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    return(
        <>
            <Head>

                <title>Sistema - new order</title>
            </Head>

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
                                <Input placeholder='NOME' value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())} style={{width: '300px'}} />
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

                                <Button onClick={handlefilterCliCax}  type='button' ><FcSearch  size={28}/></Button>
                            </div>                       
                            
                        </div>

                        <div className={styles.dadosOrder}>
                            <span>CLIENTE: {clienteName}</span>
                            <span>|</span>
                            <span>CAIXA: {caixaName}</span>
                        </div>

                        <Button type='submit' loading={loading} onClick={handleRegisterOrder}
                            style={
                                {width: '500px', 
                                height: '50px', 
                                marginTop: '1rem', 
                                fontSize: '20px'
                            }}>ABRIR PEDIDO
                        </Button>
                        
                        <article className={styles.listContainer}>
                            {listFilterCliCax()}
                        </article>
                    </div>
                </main>
            </div>
        </>
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
