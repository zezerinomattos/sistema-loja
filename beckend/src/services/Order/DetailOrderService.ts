import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: OrderRequest) {

    if(!order_id){
        throw new Error('Order not found');
    }

    const detailProduto = await prismaClient.item.findMany({
        where:{
            order_id: order_id,
        },
        select:{
            produto: {
                select:{
                    nome_produto: true,
                    marca: true,
                    preco_venda: true
                }
            },
            cor: true,
            tamanho: {
                select: {
                    tamanho: true
                }
            },
            preco: true,
            qtd: true
        }
    });

    const detailOrder = await prismaClient.order.findMany({
        where: {
            id: order_id,
        },
    });

    return {
        detailOrder,
        detailProduto
    };
  }
}

export { DetailOrderService };

