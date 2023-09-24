import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
    desconto: number;
    caixa_id?: string;
}

class EditOrderService{
    async execute({ order_id, desconto, caixa_id }: OrderRequest){

        //SE EDITAR CAIXA 
        if(caixa_id){
            const caixaAberto = await prismaClient.caixa.findFirst({
                where: {
                    id: caixa_id
                },
                select:{
                    status: true,
                },
            });
    
            if(!caixaAberto){
                throw new Error('Caixa inválido')
            }
    
            if(caixaAberto.status === false){
                throw new Error('Caixa fechado')
            }

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
                  caixa_id: caixa_id,
                  draft: false,
                },
            });
    
            return {
                updatedOrder,
                valor_desconto,
                valor_pagar_com_desconto
            }
    
        }

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
              draft: false,
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