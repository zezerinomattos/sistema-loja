import prismaClient from "../../prisma";

interface ItemRequest{
    qtd: number;
    order_id: string;
    produto_id: string;
    tamanho_id: string;
    cor_id: string;
}

class AddItemOrderSevice{
    async execute({ qtd, order_id, produto_id, tamanho_id, cor_id }: ItemRequest){

        // const produto = await prismaClient.produto.findUnique({
        //     where: {
        //         id: produto_id
        //     },
        //     include:{
        //         produto_tamanhos_estoque: {
        //             select: {
        //                 tamanho: true,
        //                 estoque: true
        //             },
        //         },
        //         produto_cor: {
        //             select: {
        //                 cor: true
        //             },
        //         },
        //     }
        // });

        // // VERIFICANDO SE A PRODUTOS EM ESTOQUE

        // if (!produto) {
        //     throw new Error("Produto não encontrado");
        // }

        // if(!produto.produto_tamanhos_estoque[0].tamanho || !produto.produto_cor[0].cor){
        //     throw new Error("Tamanho ou cor não encontrado");
        // }

        // if(produto.produto_tamanhos_estoque[0].tamanho && produto.produto_tamanhos_estoque[0].estoque <= 0){
        //     throw new Error("Estoque insuficinte");
        // }

        // const qtdEstoque = produto.produto_tamanhos_estoque[0].estoque - qtd;

        // if(qtdEstoque < 0){
        //     throw new Error("Estoque insuficinte");
        // }

        // const preco = produto.porcentagem_venda;
        // const precoTotalItem = qtd * preco; 
        // const desconto_atual = produto.desconto_atual;
        // const desconto_maximo = produto.desconto_maximo;

        // const item = await prismaClient.item.create({
        //     data: {
        //         order_id: order_id,
        //         produto_id: produto_id,
        //         qtd: qtd,
        //         preco: preco,
        //         tamanho_id: tamanho_id,
        //         cor_id: cor_id,
        //     },
        // });     

        // // const order = await prismaClient.order.update({
        // //     where: { id: order_id },
        // //     data: { 
        // //         valor_total: { 
        // //             increment: qtd * preco
        // //         },
        // //     },
        // // });

        // return{
        //     item,
        //     precoTotalItem,
        //     desconto_atual,
        //     desconto_maximo,          
        // }
    }
}

export { AddItemOrderSevice }