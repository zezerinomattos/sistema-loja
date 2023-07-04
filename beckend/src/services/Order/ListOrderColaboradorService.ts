import prismaClient from "../../prisma"

interface OrderRequest{
    colaborador_id: string;
}

class ListOrderColaboradorService{
    async execute({ colaborador_id }: OrderRequest){
        if(!colaborador_id){
            throw new Error('Inserir o colaborador');
        }

        const order = await prismaClient.order.findMany({
            where:{
                colaborador_id: colaborador_id,
            },
            orderBy:{
                created_at: 'desc',
            },
        });

        return order;
    }
}

export { ListOrderColaboradorService }