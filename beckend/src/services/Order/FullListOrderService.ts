import prismaClient from "../../prisma";

class FullListOrderService{
    async execute(){
        const fullListOrder = await prismaClient.order.findMany({
            orderBy: {
                created_at: 'desc'
            },
        });

        return fullListOrder;
    }
}

export { FullListOrderService }