import React, { useContext, useEffect, useState  } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { toast } from 'react-toastify';
import Modal from 'react-modal';

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';

import { Input } from '../../../components/Ui/Input';
import { ModalDetailOrder } from '../../../components/ModalOrder/ModalDetailOrder';
import { ModalAlert } from '../../../components/Utils/ModalAlert';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

export type OrderProps = {
    id: string;
    status: boolean;
    draft: boolean;
    valor_total: number;
    desconto: number;
    valor_pagar: number;
    created_at: Date;
    updated_at: Date;
    cliente_id: string;
    colaborador_id: string;
    caixa_id: string;
    cliente:{
        usuario:{
            nome: string;
        };
    };
    colaborado: {
        usuario:{
            nome: string;
        };
    };
    caixa:{
        colaborador: {
            usuario:{
                nome: string;
            };
        };
    };
    items: Array<{
        id: string;
        produto_id: string;
        produto_name: string;
        cor_id: string;
        color_name: string;
        tamanho_id: string;
        size_name: string;
        preco: number;
        preco_unit: number;
        qtd: number;
    }>
}

export interface ListOrder{
    order: OrderProps[];
}


export default function ListOrder({ order }: ListOrder){
    const { user } = useContext(AuthContext);

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [listId, setListId] = useState('');
    const [listName, setListName] = useState('');
    const [listDateStart, setListDateStart] = useState('');
    const [listDateEnd, setListDateEnd ] = useState('');

    const [selectedFilterOption, setSelectedFilterOption] = useState("TODOS");
    const [selectedFilter, setSelectedFilter] = useState('TODOS');

    const [orderLyList, setOrderList] = useState(order || []);

    const [modalOrderDetail, setModalOrderDetail] = useState<OrderProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    const [modalVisibleAlert, setModalVibleAlert] = useState(false);
    const [alertIdOrder, setAlertIdOrder] = useState('');
    const [titleAlert, setTitleAlert] = useState('Excluir Pedido');
    const [menssageAlert, setMenssageAlert] = useState('Deseja realmente DELETAR esse pedido???');
    const [deleteItems, setDeleteItems] = useState<OrderProps[]>();

    //FUNCAO PARA FILTRAR AS ORDER
    function filterOrder(){
        //FILTRANDO SE TEM ID
        if(listId){
            const filterOrder = order.filter((ord) => ord.id.includes(listId));
            setOrderList(filterOrder);
        }
        //-------------------------------------------
        //FILTRANDO TODAS AS ORDENS
        if(!listId && !listName && selectedFilterOption === 'TODOS' && selectedFilter === 'TODOS'){
            setOrderList(order);
        }

        //FILTRANDO POR TODAS ORDENS COM FILTRO DE DATA
        if (!listId && !listName && selectedFilterOption === 'TODOS' && selectedFilter === 'TODOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate;
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO POR TODAS ORDENS FECHADAS
        if(!listId && !listName && selectedFilterOption === 'FECHADOS' && selectedFilter === 'TODOS'){
            const filteredOrders = order.filter((ord) => ord.status === true);
            setOrderList(filteredOrders);
        }

        //FILTRANDO POR TODAS ORDENS FECHADAS COM FILTRO DE DATA
        if (!listId && !listName && selectedFilterOption === 'FECHADOS' && selectedFilter === 'TODOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.status === true;
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO POR TODAS ORDENS ABERTOS
        if(!listId && !listName && selectedFilterOption === 'ABERTOS' && selectedFilter === 'TODOS'){
            const filteredOrders = order.filter((ord) => ord.status === false && ord.draft === false);
            setOrderList(filteredOrders);
        }

        //FILTRANDO POR TODAS ORDENS ABERTOS COM FILTRO DE DATA
        if (!listId && !listName && selectedFilterOption === 'ABERTOS' && selectedFilter === 'TODOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.status === false && ord.draft === false;
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO POR TODAS ORDENS EM RASCUNHOS
        if(!listId && !listName && selectedFilterOption === 'RASCUNHOS' && selectedFilter === 'TODOS'){
            const filteredOrders = order.filter((ord) => ord.draft === true);
            setOrderList(filteredOrders);
        }

        //FILTRANDO POR TODAS ORDENS ABERTOS COM FILTRO DE DATA
        if (!listId && !listName && selectedFilterOption === 'RASCUNHOS' && selectedFilter === 'TODOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.draft === true;
            });
        
            setOrderList(filteredOrders);
        }

        //-------------------------------------------
        //FILTRANDO TODOS PELO NOME DO VENDEDOR
        if(!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'TODOS'){
            const filteredOrders = order.filter((ord) => ord.colaborado.usuario.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO TODOS PELO NOME DO VENDEDOR COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'TODOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.colaborado.usuario.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO VENDEDOR E FECHADOS
        if(!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'FECHADOS'){
            const filteredOrders = order.filter((ord) => ord.status === true && ord.colaborado.usuario.nome.includes(listName));
            setOrderList(filteredOrders);
        }

         //FILTRANDO PELO NOME DO VENDEDOR E FECHADOS COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'FECHADOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.status === true && ord.colaborado.usuario.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO VENDEDOR E ABERTOS
        if(!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'ABERTOS'){
            const filteredOrders = order.filter((ord) => ord.status === false && ord.draft === false && ord.colaborado.usuario.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO VENDEDOR E ABERTOS COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'ABERTOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.status === false && ord.draft === false && ord.colaborado.usuario.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO VENDEDOR E RASCUNHO
        if(!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'RASCUNHOS'){
            const filteredOrders = order.filter((ord) => ord.draft === true && ord.colaborado?.usuario?.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO VENDEDOR E RASCUNHO COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'RASCUNHOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.draft === true && ord.colaborado.usuario.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //-------------------------------------------
        //FILTRANDO TODOS PELO NOME DO CAIXA
        if(!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'TODOS'){
            const filteredOrders = order.filter((ord) => ord.caixa?.colaborador?.usuario?.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO TODOS PELO NOME DO CAIXA COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'TODOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.caixa?.colaborador?.usuario?.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO CAIXA E FECHADOS
        if(!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'FECHADOS'){
            const filteredOrders = order.filter((ord) => ord.status === true && ord.caixa?.colaborador?.usuario?.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO CAIXA E FECHADOS COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'FECHADOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate &&  ord.status === true && ord.caixa?.colaborador?.usuario?.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO CAIXA E ABERTOS
        if(!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'ABERTOS'){
            const filteredOrders = order.filter((ord) => ord.status === false && ord.draft === false && ord.caixa?.colaborador?.usuario?.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO CAIXA E ABERTOS COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'ABERTOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate &&  ord.status === false && ord.draft === false && ord.caixa?.colaborador?.usuario?.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO VENDEDOR E RASCUNHO
        if(!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'RASCUNHOS'){
            const filteredOrders = order.filter((ord) => ord.draft === true && ord.caixa?.colaborador?.usuario?.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO VENDEDOR E RASCUNHO COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'RASCUNHOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.draft === true && ord.caixa?.colaborador?.usuario?.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //-------------------------------------------
        //FILTRANDO TODOS PELO NOME DO CLIENTE
        if(!listId && listName && selectedFilter === 'CLIENTE' && selectedFilterOption === 'TODOS'){
            const filteredOrders = order.filter((ord) => ord.cliente?.usuario?.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO TODOS PELO NOME DO CLIENTE COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'CLIENTE' && selectedFilterOption === 'TODOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.cliente?.usuario?.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO CAIXA E FECHADOS
        if(!listId && listName && selectedFilter === 'CLIENTE' && selectedFilterOption === 'FECHADOS'){
            const filteredOrders = order.filter((ord) => ord.status === true && ord.cliente?.usuario?.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO CAIXA E FECHADOS COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'CLIENTE' && selectedFilterOption === 'FECHADOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.status === true && ord.cliente?.usuario?.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO CAIXA E ABERTOS
        if(!listId && listName && selectedFilter === 'CLIENTE' && selectedFilterOption === 'ABERTOS'){
            const filteredOrders = order.filter((ord) => ord.status === false && ord.draft === false && ord.cliente?.usuario?.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO CAIXA E ABERTOS COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'CLIENTE' && selectedFilterOption === 'ABERTOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.status === false && ord.draft === false && ord.cliente?.usuario?.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO VENDEDOR E RASCUNHO
        if(!listId && listName && selectedFilter === 'CLIENTE' && selectedFilterOption === 'RASCUNHOS'){
            const filteredOrders = order.filter((ord) => ord.draft === true && ord.cliente?.usuario?.nome.includes(listName));
            setOrderList(filteredOrders);
        }

        //FILTRANDO PELO NOME DO VENDEDOR E RASCUNHO COM FILTRO DE DATA
        if (!listId && listName && selectedFilter === 'CLIENTE' && selectedFilterOption === 'RASCUNHOS' && listDateStart && listDateEnd) {
            const startDate = new Date(listDateStart); // Converte a data de início para um objeto Date
            const endDate = new Date(listDateEnd); // Converte a data de término para um objeto Date

            // Subtrai 3 horas das datas
            startDate.setHours(startDate.getHours() + 3);
            endDate.setHours(endDate.getHours() + 3);
        
            // Filtre as ordens com datas dentro do intervalo [startDate, endDate]
            const filteredOrders = order.filter((ord) => {
                const orderDate = new Date(ord.created_at); // Converte a data da ordem para um objeto Date
                return orderDate >= startDate && orderDate <= endDate && ord.draft === true && ord.cliente?.usuario?.nome.includes(listName);
            });
        
            setOrderList(filteredOrders);
        }

    }

    // FUNÇÃO LIMPAR FILTRO
    function clearFilter() {
        setOrderList(order);
        setListId('');
        setListName('');
        setListDateEnd('');
        setListDateStart('');
    }

    // ATUALIZAR O FILTRO À MEDIDA QUE DIGITA
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            filterOrder();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [listName, selectedFilterOption]);

    //FUNCAO PARA DELETAR ORDER
    async function handleDelete(res: string, id: string){
        if(user.cargo !== 'GERENTE' && user.cargo !== 'ADMIM'){
            toast.warning('ATENÇÃO, VOCÊ NÃO TEM ALTORIZAÇÃO PARA DELETAR UM PEDIDO!')
            return;
        }

        if(res === 'sim'){
            
            // //Filtra a lista de orders pelo id passado
            const idOrder = order.filter((ord) => ord.id === id);
            
            setModalVibleAlert(false)

            //Pega o status da order filtrada
            const statusOrder = order[0].status;

            // Encontre a ordem com o ID correspondente
            const ordemEncontrada = order.find(ord => ord.id === id);

            if(ordemEncontrada?.status){
                toast.warning('ATENÇÃO, VOCÊ NÃO PODE DELETAR UM PEDIDO FINALIZADO!')  
                return;
            }else{
                await api.get('/detail/order', {
                    params: {
                        order_id: id,
                    }
                })
                .then(response => {
                    setDeleteItems(response.data?.detailOrder);
                })     
            }

        }else if(res === 'nao'){
            setModalVibleAlert(false)
            return
        }
    }
    //ATUALIZA O ESTADO DE DELETAR O ITEM E DELETA O ORDER
    useEffect(() => {        
        try {
            deleteItems?.map(async (ord) => {
                if (ord.items.length === 0) {
                    await api.delete('/delete/order', {
                        params: {
                            order_id: ord.id
                        }
                    });
                    toast.success('PEDIDO EXCLUÍDO!');
                    window.location.reload();
                } else {
                    for (const item of ord.items) {
                        await api.delete('/delete/item', {
                            params: {
                                item_id: item.id
                            }
                        });
                    }
                    await api.delete('/delete/order', {
                        params: {
                            order_id: ord.id
                        }
                    });
                    toast.success('PEDIDO EXCLUÍDO!');
                    window.location.reload();
                }
            });
        }catch (error: any) {
            console.error(error);
            if (error.response) {
                toast.error(error.response.data.erro);
            } else {
                toast.error('Ocorreu um erro na solicitação.');
            }
            setCarregando(false);
        }
        
    }, [deleteItems]);

    //FUNCAO QUE ABRE MODAL DE ALERT
    function alertConfirm(id: string ){
        setAlertIdOrder(id);
        setModalVibleAlert(true);
    }

    //FUNCAO DE DETALHE DE ORDER E ABRE MODAL
    async function handleDetailOrder(id: string){
        await api.get('/detail/order', {
            params:{
                order_id: id,
            }
        })
        .then(response => {
            setModalOrderDetail(response.data?.detailOrder);
            setModalVisible(true);
            setCarregando(false);
            //console.log(response.data?.detailOrder);
        })
        .catch(error => {
            console.log(error);
            setCarregando(false)
        })
        
    }

    // FUNCAO FECHAR MODAL
    function handleCloseModal(){
        setModalVisible(false);
    }

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    Modal.setAppElement('#__next');

    return(
        <>
            <Head>

                <title>Sistema - list order</title>
            </Head>

            <div className={styles.container}>
                <Header title={'LISTA DE PEDIDOS'}/>

                <main className={styles.containerFavorit}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)} style={{width: '300px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <select 
                                    name="product" 
                                    id="product"
                                    value={selectedFilter} 
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className={styles.selectInput}
                                >
                                    <option value="TODOS">TODOS</option>
                                    <option value="VENDEDOR">VENDEDOR</option>
                                    <option value="CAIXA">CAIXA</option>
                                    <option value="CLIENTE">CLIENTE</option>
                                </select>
                            </div>

                            <div className={styles.filter}>
                                <Input placeholder={selectedFilter} value={listName} onChange={(e) => setListName(e.target.value.toUpperCase())} style={{width: '250px'}}/>
                            </div>

                            <div className={styles.inputRadioContainer}>
                                <div className={styles.filterRadio}>
                                    <input
                                    type="radio"
                                    name="filterOption"
                                    value="TODOS"
                                    checked={selectedFilterOption === "TODOS"}
                                    onChange={() => setSelectedFilterOption("TODOS")}
                                    />
                                    <label htmlFor="todos">TODOS</label>
                                </div>

                                <div className={styles.filterRadio}>
                                    <input
                                    type="radio"
                                    name="filterOption"
                                    value="FECHADOS"
                                    checked={selectedFilterOption === "FECHADOS"}
                                    onChange={() => setSelectedFilterOption("FECHADOS")}
                                    />
                                    <label htmlFor="fechados">FECHADOS</label>
                                </div>

                                <div className={styles.filterRadio}>
                                    <input
                                    type="radio"
                                    name="filterOption"
                                    value="ABERTOS"
                                    checked={selectedFilterOption === "ABERTOS"}
                                    onChange={() => setSelectedFilterOption("ABERTOS")}
                                    />
                                    <label htmlFor="fechados">ABERTOS</label>
                                </div>

                                <div className={styles.filterRadio}>
                                    <input
                                    type="radio"
                                    name="filterOption"
                                    value="RASCUNHOS"
                                    checked={selectedFilterOption === "RASCUNHOS"}
                                    onChange={() => setSelectedFilterOption("RASCUNHOS")}
                                    />
                                    <label htmlFor="rascunhos">RASCUNHOS</label>
                                </div>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={filterOrder} className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>

                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input type='date' value={listDateStart} onChange={(e) => setListDateStart(e.target.value)} style={{width: '150px', marginTop: '5px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <Input type='date' value={listDateEnd} onChange={(e) => setListDateEnd(e.target.value)} style={{width: '150px', marginTop: '5px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={clearFilter} className={styles.buttonBuscar} style={{marginTop: '5px'}}>LIMPAR</button>
                            </div>
                        </div>
                        
                        <article className={styles.listContainer}>
                            <ol className={styles.list}>
                                {orderLyList.map(ord => (
                                    <li key={ord.id}>
                                        <span className={styles.idDetail}>{ord?.id}</span>
                                        <span 
                                            className={styles.nameDetail}
                                            onClick={() => handleDetailOrder(ord.id)}
                                        >{ord.cliente?.usuario?.nome}
                                        </span>
                                        <span className={ord.status === true ? styles.spanStatus : ''}>{ord.status === true ? 'FINALIZADO' : "ABERTO"}</span>
                                        <span className={ord.draft === true ? styles.spanDraft : ''}>{ord.draft === true ? 'RASCUNHO' : 'PEDIDO'}</span>
                                        <span>{ord.valor_pagar}</span>
                                        <span>{new Date(ord.updated_at).toLocaleDateString()}</span>
                                        <BsTrash 
                                            size={20} 
                                            style={{color: '#FF3F4B', cursor: 'pointer'}}
                                            onClick={() => alertConfirm(ord.id)}
                                        />           
                                    </li>
                                ))}
                            </ol>
                        </article>
                    </div>
                </main>
                {
                    modalVisible && modalOrderDetail && (
                        <ModalDetailOrder 
                            isOpen={modalVisible}
                            onRequestClose={handleCloseModal}
                            detalOrder={modalOrderDetail}
                        />
                    )
                }

                {
                    modalVisibleAlert && (
                        <ModalAlert 
                            isOpen={modalVisibleAlert}
                            onRequestClose={handleDelete}
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
export const getServerSideProps = canSSRAuth(async (ctx) => {

    //@ts-ignore
    const apiOrder = setupAPIClient(ctx);
    const response = await apiOrder.get('full/order');

    //console.log(response.data);

    return{
      props: {
        order: response.data
      }
    }
});