import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { ModalAlert } from '../../../components/Utils/ModalAlert';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

type CaixaProps = {
    id: string;
    status: boolean;
    colaborador: {
        id: string;
        usuario: {
            nome: string;
        };
    };
}

interface ListProps{
    caixa: CaixaProps[];
}

export default function EditOrder({ caixa }: ListProps){
    const { user } = useContext(AuthContext);
    
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    //const [message, setMessage] = useState('');

    const [order_id, setOrderId] = useState('');
    const [desconto, setDesconto] = useState(0);
    const [caixa_id, setCaixa_id] = useState('');
    
    const [clieteName, setClieteName] = useState('');
    const [vendedorName, setVendedorName] = useState('');
    const [caixaName, setCaixaName] = useState('');
    const [status, setStatus] = useState<boolean>()

    const [caixasAbertos, setCaixasAbertos] = useState(caixa || []);

    const [modalVisibleAlert, setModalVibleAlert] = useState(false);
    const [alertIdOrder, setAlertIdOrder] = useState('');
    const [titleAlert, setTitleAlert] = useState('Editar pedido');
    const [menssageAlert, setMenssageAlert] = useState('Você tem certeza de que deseja EDITAR este pedido? Lembre-se de que, se o pedido for um rascunho, ele será atualizado para um pedido em aberto e não poderá mais ser considerado um rascunho.');
    // const [deleteItems, setDeleteItems] = useState<OrderProps[]>();

    //FUNCAO QUE ABRE MODAL DE ALERT
    function alertConfirm(id: string ){
        setAlertIdOrder(id);
        setModalVibleAlert(true);
    }

    //FUNCAO PARA EDITAR ORDER
    async function hadleRegister(res: string, id: string){

        if(res === 'sim'){
            if(!order_id){
                toast.warning('Iforme o código do Pedido!');
                setModalVibleAlert(false)
                return;
            }
    
            if(status === true){
                toast.warning('Você não pode editar um pedido que já foi FINALIZADO!');
                setModalVibleAlert(false)
                return;
            }
    
            setLoaging(true);
    
            if(caixa_id){
                await api.put('/edit/order', {
                    order_id: order_id,
                    desconto: desconto,
                    caixa_id:caixa_id
                })
                .then(() => {
                    setModalVibleAlert(false)
                    toast.success('Pedido editado!');
                })
                .catch(error => {
                    setModalVibleAlert(false)
                    console.log(error);
                    toast.error(error.response.data.erro);       
                });
            }else{
                await api.put('/edit/order', {
                    order_id: order_id,
                    desconto: desconto
                    //caixa_id:caixa_id
                })
                .then(() => {
                    setModalVibleAlert(false)
                    toast.success('Pedido editado!');
                })
                .catch(error => {
                    setModalVibleAlert(false)
                    console.log(error);
                    toast.error(error.response.data.erro); 
                });
            }
    
            setLoaging(false);
        }else if(res === 'nao'){
            setModalVibleAlert(false)
            return
        }

    }

    //FUNCAO PARA BUSCAR O ORDER
    async function handleFilter(){
        if(!order_id){
            toast.warning('Iforme o código do Pedido!')
            return;
        }

        setLoaging(true);

        await api.get('/detail/order', {
            params:{
                order_id: order_id,
            }
        })
        .then(response => {
            setClieteName(response.data?.detailOrder[0]?.cliente?.usuario?.nome);
            setVendedorName(response.data?.detailOrder[0]?.colaborado.usuario?.nome);
            setCaixaName(response.data?.detailOrder[0].caixa?.colaborador.usuario?.nome);
            setDesconto(response.data?.detailOrder[0]?.desconto);
            setStatus(response.data?.detailOrder[0]?.status);
            //console.log(response.data?.detailOrder[0]?.desconto);
            setLoaging(false);
        })
        .catch(error => {
            console.log(error);
            toast.error('ID do cliente inválido');
            setClieteName('');
            setVendedorName('');
            setCaixaName('');
            setDesconto(0);
            setLoaging(false);
        })
    }

    useEffect(() => {
        // Filtrar os caixas abertos (status true)
        const caixasFiltrados = caixa.filter((cxa) => cxa.status === true);
        setCaixasAbertos(caixasFiltrados);

        //console.log(caixasAbertos)
    }, [caixa]);

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

                <title>Sistema - edit order</title>
            </Head>
            <div className={styles.container}>
                <Header title={'NOVA FABRICA'}/>

                <main className={styles.containerBody}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={order_id} onChange={(e) => setOrderId(e.target.value)} style={{width:'350px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={handleFilter} className={styles.buttonBuscar}>{loading ? <FaSpinner /> : 'BUSCAR'} <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>

                        <form className={styles.formOrder}>
                            <div className={styles.inputData}>
                                <span>{`CLIENTE: ${clieteName}`}</span>
                                <span>|</span>
                                <span>{`VENDEDOR: ${vendedorName}`}</span>
                                <span>|</span>
                                <span>{`CAIXA: ${caixaName}`}</span>
                            </div>

                            <div className={styles.inputDataEdit}>
                                <div className={styles.desconto}>
                                    <label htmlFor="desc">DESCONTO</label>
                                    <Input 
                                        id='desc' 
                                        type='number' 
                                        className={styles.inputName} 
                                        value={desconto? desconto : 0} 
                                        //onChange={(e) => setDesconto(parseInt(e.target.value))}
                                        style={{width: '80px'}}
                                        onChange={(e) => {
                                            const newValue = parseInt(e.target.value);
                                            if (!isNaN(newValue) && newValue >= 0) {
                                            setDesconto(newValue);
                                            }
                                        }}
                                    />
                                </div>
                                
                                
                                <div className={styles.filter}>
                                    <select 
                                        name="product" 
                                        id="product"
                                        value={''} 
                                        onChange={(e) => setCaixa_id(e.target.value)}
                                        className={styles.selectInput}
                                    >
                                        <option value="" disabled>TROCAR CAIXA</option>
                                        {caixasAbertos.map((cxa) => (
                                            <option key={cxa.id} value={cxa.id}>{cxa.colaborador.usuario.nome}</option>
                                        ))}
                                    </select>

                                    {/* <Button  type='button' ><FcSearch  size={28}/></Button> */}
                                </div> 
                            </div>

                            <Button type='button' loading={loading}
                                style={
                                    {width: '500px', 
                                    height: '50px', 
                                    marginTop: '1.5rem', 
                                    fontSize: '20px',
                                    margin: 'auto'
                                }}
                                onClick={() => alertConfirm('')}
                                >ALTERAR PEDIDO
                            </Button>

                        </form>
                    </div>
                </main>

                {
                    modalVisibleAlert && (
                        <ModalAlert 
                            isOpen={modalVisibleAlert}
                            onRequestClose={hadleRegister}
                            idOrder={alertIdOrder}
                            titleAlert={titleAlert}
                            menssageAlert={menssageAlert}
                        />
                    )
                }

            </div>
        </>
    )
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async(ctx) => {

    //@ts-ignore
    const apiCaixa = setupAPIClient(ctx);

    const caixa = await apiCaixa.get('caixa');
    //console.log(caixa.data);

    return{
        props:{
            caixa: caixa.data
        }
    }
})