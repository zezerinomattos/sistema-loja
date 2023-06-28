import prismaClient from "../../prisma";

class ListDraftOrderService{
    async execute(){
        const listDraft = await prismaClient.order.findMany({
            where: {
                draft: true
            },
            orderBy: {
                created_at: 'desc'
            },
        });

        return listDraft;
    }
}

export { ListDraftOrderService }