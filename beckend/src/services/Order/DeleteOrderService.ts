import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class DeleteOrderService{
    async execute({ order_id }: OrderRequest){
        
        try {
            const deleteOrder = await prismaClient.order.delete({
                where: {
                    id: order_id
                }
            });

            return deleteOrder

        } catch (error) {
            throw new Error('Exclua todos os itens para excluir uma order');
        }   
    }
}

export { DeleteOrderService }