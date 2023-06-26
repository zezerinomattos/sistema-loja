import prismaClient from "../../prisma";

interface ProdutoRequest{
    produto_id: string;
}

class DetailProdutoService{
    async execute({ produto_id }: ProdutoRequest){

        const produto = await prismaClient.produto.findFirst({
            where: {
                id: produto_id,
            },
            include:{
                produto_cor:{
                    select: {
                        cor: true,
                        produto_tamanhos_estoque: {
                            select:{
                                tamanho: true,
                                estoque: true
                            },
                        },
                    },
                },
            }
        })

        return { produto };
    }
}

export { DetailProdutoService }