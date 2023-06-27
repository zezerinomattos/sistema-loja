import prismaClient from "../../prisma";

class ListOrderService{
    async execute(){
        const order = await prismaClient.order.findMany({
            where: {
                draft: false
            },
            orderBy: {
                created_at: 'desc'
            },
        });

        return order;
    }
}

export { ListOrderService }