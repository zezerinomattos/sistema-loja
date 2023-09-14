import prismaClient from "../../prisma";

interface ItemRequest{
    item_id: string;
}

class DeleteItemService{
    async execute({ item_id }: ItemRequest){
        // Encontrar o item antes de deletar
        const item = await prismaClient.item.findUnique({
            where: {
                id: item_id,
            },
            include:{
                order: true,
                //produto: true,
                //tamanho: true,
                //cor: true,
            },
        });

        if (!item) {
            throw new Error("Item não encontrado");
        }

        // Deletar o item
        const deleteItem = await prismaClient.item.delete({
            where: { 
                id: item_id
            }
        });

        // Arredondar o valor para duas casas decimais
        const roundedValue = Number(item.preco.toFixed(2));

        // Atualizar o valor_total no pedido
        const updatedOrder  = await prismaClient.order.update({
            where: {
                id: item.order.id,
            },
            data:{
                valor_total: {
                    //decrement: item.qtd * item.preco,
                    decrement: roundedValue,
                },
                valor_pagar: {
                    // decrement: item.qtd * item.preco,
                    decrement: roundedValue,
                },
            },
        });

        // Atualizar o estoque adicionando a quantidade do item de volta
        const updateTamanho = await prismaClient.produtoTamanhoEstoque.update({
            where: {
                // id: item.tamanho.id,
                id: item.tamanho_id
            },
            data: {
                // estoque: item.tamanho.estoque + item.qtd,
                estoque: {
                    increment: item.qtd,
                }
            },
        });

        return {
            deleteItem, 
            updatedOrder,
            updateTamanho
        };
    }
}

export { DeleteItemService }