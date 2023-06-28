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

        const caixaAberto = await prismaClient.caixa.findFirst({
            where: {
                id: caixa_id
            },
            select:{
                status: true,
            },
        });

        if(!caixa_id){
            throw new Error('Informe um caixa');
        }

        if(!caixaAberto){
            throw new Error('Caixa inválido')
        }

        if(caixaAberto.status === false){
            throw new Error('Caixa fechado')
        }

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