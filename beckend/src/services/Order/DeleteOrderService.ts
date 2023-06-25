import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class DeleteOrderService{
    async execute({ order_id }: OrderRequest){

        const deleteOrder = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        });

        return deleteOrder
    }
}

export { DeleteOrderService }