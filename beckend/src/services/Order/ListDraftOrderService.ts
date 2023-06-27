import prismaClient from "../../prisma";

class ListDraftOrderService{
    async execute(){
        const listDraft = await prismaClient.order.findMany({
            where: {
                draft: true
            }
        });

        return listDraft;
    }
}

export { ListDraftOrderService }