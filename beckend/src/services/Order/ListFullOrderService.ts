import prismaClient from "../../prisma";

class ListFullOrderService{
    async execute(){
        const fullListOrder = await prismaClient.order.findMany({
            orderBy: {
                created_at: 'desc'
            },
            include:{
                cliente:{
                    select:{
                        usuario:{
                            select:{
                                nome: true,
                            },
                        },
                    },
                },
                colaborado:{
                    select: {
                        usuario:{
                            select:{
                                nome: true,
                            },
                        },
                    },
                },
                caixa:{
                    select:{
                        colaborador:{
                            select: {
                                usuario:{
                                    select:{
                                        nome: true,
                                    },
                                },
                            },
                        }
                    }
                }
            }
        });

        return fullListOrder;
    }
}

export { ListFullOrderService }