import prismaClient from "../../prisma";

class ListFullOrderService{
    async execute(){
        const fullListOrder = await prismaClient.order.findMany({
            orderBy: {
                created_at: 'desc'
            },
        });

        return fullListOrder;
    }
}

export { ListFullOrderService }