import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: OrderRequest) {

    if(!order_id){
        throw new Error('Order not found');
    }

    const detailOrder = await prismaClient.order.findMany({
        where: {
            id: order_id,
        },
        include:{
            caixa: {
                select:{
                    colaborador: {
                        select:{
                            usuario: {
                                select: {
                                    nome: true,
                                },
                            },
                        },
                    },
                },
            },
            colaborado: {
                select:{
                    usuario: {
                        select: {
                            nome: true,
                        },
                    },
                },
            },
            cliente: {
                select:{
                    usuario: {
                        select: {
                            nome: true,
                        },
                    },
                },
            },
            items: true,
        }
    });

    return {
        detailOrder,
    };
  }
}

export { DetailOrderService };
