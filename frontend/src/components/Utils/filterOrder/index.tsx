import React, { useState} from 'react';

import {  OrderProps } from '../../../pages/order/listorder';

interface ListOrder{
    order: OrderProps[];
    listId: string;
    listName: string;
    listOptions: boolean;
    listSelected: boolean;
    selectedFilterOption: string;
    selectedFilter: string;
    orderLyList:  OrderProps[];
}

export function FilterOrder({ listOrder }: { listOrder: ListOrder }){
    const { order, listId, listName, listOptions, listSelected, selectedFilterOption, selectedFilter, orderLyList } = listOrder;
    //const [orderLyListt, setOrderList] = useState(order || []);

    //FILTRANDO SE TEM ID
    if(listId){
        const filterOrder = order.filter((ord) => ord.id.includes(listId));
        setOrderList(filterOrder);
    }

    //FILTRANDO TODAS AS ORDENS
    if(!listId && !listName && selectedFilterOption === 'TODOS' && selectedFilter === 'TODOS'){
        setOrderList(order);
    }

    //FILTRANDO POR TODAS ORDENS FECHADAS
    if(!listId && !listName && selectedFilterOption === 'FECHADOS' && selectedFilter === 'TODOS'){
        const filteredOrders = order.filter((ord) => ord.status === true);
        setOrderList(filteredOrders);
    }

    //FILTRANDO POR TODAS ORDENS ABERTOS
    if(!listId && !listName && selectedFilterOption === 'ABERTOS' && selectedFilter === 'TODOS'){
        const filteredOrders = order.filter((ord) => ord.status === false && ord.draft === false);
        setOrderList(filteredOrders);
    }

    //FILTRANDO POR TODAS ORDENS EM RASCUNHOS
    if(!listId && !listName && selectedFilterOption === 'RASCUNHOS' && selectedFilter === 'TODOS'){
        const filteredOrders = order.filter((ord) => ord.draft === true);
        setOrderList(filteredOrders);
    }

    //-------------------------------------------
    //FILTRANDO TODOS PELO NOME DO VENDEDOR
    if(!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'TODOS'){
        const filteredOrders = order.filter((ord) => ord.colaborado.usuario.nome.includes(listName));
        setOrderList(filteredOrders);
    }

    //FILTRANDO PELO NOME DO VENDEDOR E FECHADOS
    if(!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'FECHADOS'){
        const filteredOrders = order.filter((ord) => ord.status === true && ord.colaborado.usuario.nome.includes(listName));
        setOrderList(filteredOrders);
    }

    //FILTRANDO PELO NOME DO VENDEDOR E ABERTOS
    if(!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'ABERTOS'){
        const filteredOrders = order.filter((ord) => ord.status === false && ord.draft === false && ord.colaborado.usuario.nome.includes(listName));
        setOrderList(filteredOrders);
    }

    //FILTRANDO PELO NOME DO VENDEDOR E RASCUNHO
    if(!listId && listName && selectedFilter === 'VENDEDOR' && selectedFilterOption === 'RASCUNHOS'){
        const filteredOrders = order.filter((ord) => ord.draft === true && ord.colaborado?.usuario?.nome.includes(listName));
        setOrderList(filteredOrders);
    }

    //-------------------------------------------
    //FILTRANDO TODOS PELO NOME DO CAIXA
    if(!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'TODOS'){
        const filteredOrders = order.filter((ord) => ord.caixa?.colaborador?.usuario?.nome.includes(listName));
        setOrderList(filteredOrders);
    }

     //FILTRANDO PELO NOME DO CAIXA E FECHADOS
     if(!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'FECHADOS'){
        const filteredOrders = order.filter((ord) => ord.status === true && ord.caixa?.colaborador?.usuario?.nome.includes(listName));
        setOrderList(filteredOrders);
    }

    //FILTRANDO PELO NOME DO CAIXA E ABERTOS
    if(!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'ABERTOS'){
        const filteredOrders = order.filter((ord) => ord.status === false && ord.draft === false && ord.caixa?.colaborador?.usuario?.nome.includes(listName));
        setOrderList(filteredOrders);
    }

    //FILTRANDO PELO NOME DO VENDEDOR E RASCUNHO
    if(!listId && listName && selectedFilter === 'CAIXA' && selectedFilterOption === 'RASCUNHOS'){
        const filteredOrders = order.filter((ord) => ord.draft === true && ord.caixa?.colaborador?.usuario?.nome.includes(listName));
        setOrderList(filteredOrders);
    }
}