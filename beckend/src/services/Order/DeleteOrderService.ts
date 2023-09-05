import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class DeleteOrderService{
    async execute({ order_id }: OrderRequest){

        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            }
        });

        if(!order){
            throw new Error('Order Já não existe mais!');
        }
        
        try {
            const deleteOrder = await prismaClient.order.delete({
                where: {
                    id: order_id
                }
            });

            return deleteOrder

        } catch (error) {
            throw new Error('Exclua todos os itens para excluir um Pedido!');
        }   
    }
}

export { DeleteOrderService }