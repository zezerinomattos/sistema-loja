import prismaClient from "../../prisma";

class ListProdutosService{
    async execute(){

        const produto = await prismaClient.produto.findMany({
            select: {
                id: true,
                nome_produto: true,
                marca: true,
                preco_venda: true,
                secao: {
                    select: {
                        nome_secao: true,
                    }
                },
                categoria: {
                    select: {
                        nome_categoria: true,
                    }
                },
                representante: {
                    select: {
                        usuario: {
                            select: {
                                nome: true,
                            },
                        },
                    },
                },
                fabrica: {
                    select: {
                        empresa: true,
                    }
                }
            },
            orderBy: {
                nome_produto: 'asc'
            },
        });
        return produto;
    }
}

export { ListProdutosService }