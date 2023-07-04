import prismaClient from "../../prisma";

interface OrderRequest{
    colaborador_id?: string;
    colaborador_name?: string;
    data_inicial: Date;
    data_final: Date;
}

class ListOrderColaboradorDateService{
    async execute({ data_inicial, data_final, colaborador_id, colaborador_name }: OrderRequest){

        if(colaborador_id){
            const order = await prismaClient.order.findMany({
                where:{
                    colaborador_id: colaborador_id,
                    created_at:{
                        gte: data_inicial,
                        lte: data_final,
                    },
                },
                orderBy:{
                    created_at: 'desc',
                },
            });

            if(!order){
                throw new Error('Colaborador invalido');
            }
    
            return order;
        }

        if(colaborador_name){
            const order = await prismaClient.order.findMany({
                where:{
                    colaborado: {
                        usuario: {
                            nome: {
                                contains: colaborador_name
                            },
                        },
                    },
                    created_at:{
                        gte: data_inicial,
                        lte: data_final,
                    },
                },
                orderBy:{
                    created_at: 'desc',
                },
            });

            if(!order){
                throw new Error('Colaborador invalido');
            }
    
            return order;
        }

        if(!colaborador_id || !colaborador_name){
            throw new Error('Informe um ID ou nome do Colaborador');
        }
    }
}

export { ListOrderColaboradorDateService }