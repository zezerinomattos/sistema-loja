import prismaClient from "../../prisma";

interface OrderRequest{
    data_inicial: Date;
    data_final: Date;
}

class ListFullOrderDateService{
    async execute({ data_inicial, data_final }: OrderRequest){

        const order = await prismaClient.order.findMany({
            where:{
                created_at:{
                    gte: data_inicial,
                    lte: data_final,
                },
            },
            orderBy:{
                created_at: 'desc',
            },
        });

        return order;
    }
}

export { ListFullOrderDateService }