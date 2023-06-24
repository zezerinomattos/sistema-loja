import prismaClient from "../../prisma";

interface ProdutoRequest{
    produto_id: string;
}

class DetailProdutoService{
    async execute({ produto_id }: ProdutoRequest){

        const produto = await prismaClient.produto.findMany({
            where: {
                id: produto_id
            },
            include: {
                produto_cor: {
                    select:{
                        cor: true
                    },
                },
                produto_tamanhos_estoque: {
                    select: {
                        tamanho: true,
                        estoque: true
                    },
                },
                secao:{
                    select: {
                        nome_secao: true
                    },
                },
                categoria: {
                    select: {
                        nome_categoria: true
                    },
                },
                representante: {
                    select:{
                        usuario:{
                            select: {
                                nome: true
                            },
                        },
                    },
                },
                fabrica: {
                    select: {
                        empresa: true
                    }
                }
            }
        });

        return produto;
    }
}

export { DetailProdutoService }