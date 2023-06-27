import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
    desconto: number;
}

class EditOrderService{
    async execute({ order_id, desconto }: OrderRequest){
        const existingOrder = await prismaClient.order.findUnique({
            where: {
                id: order_id
            },
        });

        if(!existingOrder){
            throw new Error('Order não encontrada');
        }

        const valor_desconto = (desconto / 100) * existingOrder.valor_total;
        const valor_pagar_com_desconto = existingOrder.valor_total - valor_desconto;

        const updatedOrder = await prismaClient.order.update({
            where: {
              id: order_id,
            },
            data: {
              desconto: desconto,
              valor_pagar: valor_pagar_com_desconto,
              updated_at: new Date(), // Atualizar a data de atualização para a data atual
            },
        });

        return {
            updatedOrder,
            valor_desconto,
            valor_pagar_com_desconto
        }
    }
}

export { EditOrderService }