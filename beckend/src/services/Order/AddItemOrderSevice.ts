import prismaClient from "../../prisma";

interface ItemRequest{
    qtd: number;
    order_id: string;
    produto_id: string;
    tamanho_id: string;
    cor_id: string;
}

class AddItemOrderSevice{
    async execute({ qtd, order_id, produto_id, tamanho_id, cor_id }: ItemRequest){

        const produto = await prismaClient.produto.findFirst({
            where: {
                id: produto_id
            },
            include:{
                produto_cor: {
                    select: {
                        id: true,
                        cor: true,
                        produto_tamanhos_estoque: {
                            select: {
                                id: true,
                                tamanho: true,
                                estoque: true
                            },
                        },
                    },
                },
            }
        });

        // Verificar se o order existe
        const orderExiste = await prismaClient.order.findUnique({
            where: {
              id: order_id,
            },
        });
      
        if (!orderExiste) {
            throw new Error("Pedido não encontrado");
        }

        // Verificar se o produto existe
        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        // Verificar se a cor e o tamanho existem
        const produtoCor = produto.produto_cor.find((pc) => pc.id === cor_id);
            if (!produtoCor) {
            throw new Error("Cor não encontrada");
        }

        const tamanhoEstoque = produtoCor.produto_tamanhos_estoque.find((te) => te.id === tamanho_id);       
          if (!tamanhoEstoque) {
            throw new Error("Tamanho não encontrado");
        }

        // Verificar se o estoque é suficiente
        if (tamanhoEstoque.estoque <= 0) {
            throw new Error("Estoque insuficiente");
        }
    
        const qtdEstoque = tamanhoEstoque.estoque - qtd;
        if (qtdEstoque < 0) {
            throw new Error("Estoque insuficiente");
        }

        const preco = produto.porcentagem_venda;
        const precoTotalItem = qtd * preco; 
        const desconto_atual = produto.desconto_atual;
        const desconto_maximo = produto.desconto_maximo;   

        const item = await prismaClient.item.create({
            data: {
              order_id: order_id,
              produto_id: produto_id,
              qtd: qtd,
              preco: preco,
              cor_id: cor_id,
              tamanho_id: tamanho_id,
            },
        });

        // Atualizar o valor total do pedido
        const order = await prismaClient.order.update({
            where:{
                id: order_id,
            },
            data:{
                valor_total: {
                    increment: precoTotalItem
                },
            },
        });

        return{
            item,
            precoTotalItem,
            desconto_atual,
            desconto_maximo,          
        }
    }
}

export { AddItemOrderSevice }