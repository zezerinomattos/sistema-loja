import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class SendOrderService{
    async execute({ order_id }: OrderRequest){
        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
            select:{
                items:{
                    select:{
                        id: true,
                    }
                }
            }
        });

        if(!order_id){
            throw new Error("ID de Pedido não encontrado");
        }

        if(!order){
            throw new Error("Pedido não encontrado");
        }

        if(order.items.length < 1){
            throw new Error("Para salvar o pedido insira um ITEM");
        }

        const updateOrder = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data:{
                draft: false
            },
        });

        return updateOrder;
    }
}

export{ SendOrderService}