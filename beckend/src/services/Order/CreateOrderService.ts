import prismaClient from "../../prisma";

interface OrederRequest{
    status: boolean;
    draft: boolean; // Rascunho
    colaborado: string;
    cliente: string
}

class CreateOrderService{
    async execute({ status, draft, colaborado, cliente }: OrederRequest){

        const order = await prismaClient.order.create({
            data: {
                status: status,
                draft: draft,
                colaborador_id: colaborado,
                cliente_id: cliente
            },
        });

        return order;
    }
}

export { CreateOrderService }