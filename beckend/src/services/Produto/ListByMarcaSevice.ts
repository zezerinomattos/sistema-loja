import prismaClient from "../../prisma";

interface ProdutoRequest{
    marca_produto: string;
}

class ListByMarcaSevice{
    async execute({ marca_produto }: ProdutoRequest){
        const listProdMarca = await prismaClient.produto.findMany({
            where: {
                marca: {
                    contains: marca_produto
                },
            },
            select: {
                id: true,
                nome_produto: true,
                marca: true,
                preco_venda: true,
                fabrica:{
                    select: {
                        empresa: true
                    }
                }
            },
            orderBy: {
                nome_produto: 'asc'
            },
        });

        return listProdMarca
    }
}

export { ListByMarcaSevice }