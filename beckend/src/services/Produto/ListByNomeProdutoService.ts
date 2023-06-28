import prismaClient from "../../prisma";

interface ProdutoRequest{
    nome_produto: string;
}

class ListByNomeProdutoService{
    async execute({ nome_produto }: ProdutoRequest){
        const listProdNome = await prismaClient.produto.findMany({
            where: {
                nome_produto: {
                    contains: nome_produto
                },
            },
            select: {
                id: true,
                nome_produto: true,
                marca: true,
                preco_venda: true
            },
            orderBy: {
                nome_produto: 'asc'
            },
        });

        return listProdNome
    }
}

export { ListByNomeProdutoService }