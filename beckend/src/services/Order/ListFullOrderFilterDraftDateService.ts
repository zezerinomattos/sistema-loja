import prismaClient from "../../prisma";

interface OrderRequest{
    draft: boolean;
    data_inicial: Date;
    data_final: Date;
}

class ListFullOrderFilterDraftDateService{
    async execute({ data_inicial, data_final, draft }: OrderRequest){
        
        const order = await prismaClient.order.findMany({
            where:{
                draft: draft,
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

export { ListFullOrderFilterDraftDateService }