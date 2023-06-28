import prismaClient from "../../prisma";

interface OrederRequest{
    status: boolean;
    draft: boolean; // Rascunho
    colaborado: string;
    cliente: string
    caixa_id: string
}

class CreateOrderService{
    async execute({ status, draft, colaborado, cliente, caixa_id }: OrederRequest){

        const order = await prismaClient.order.create({
            data: {
                status: status,
                draft: draft,
                colaborador_id: colaborado,
                cliente_id: cliente,
                caixa_id: caixa_id
            },
        });

        return order;
    }
}

export { CreateOrderService }