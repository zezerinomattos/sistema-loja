import prismaClient from "../../prisma";

interface ProdutoRequest{
    secao_id: string;
}

class ListBySecaoService{
    async execute({ secao_id }: ProdutoRequest){
        const prodBysecao = await prismaClient.produto.findMany({
            where: {
                secao_id: secao_id
            },
            select:{
                id: true,
                nome_produto: true,
                marca: true,
                preco_venda: true
            },
            orderBy: {
                nome_produto: 'asc'
            },
        });
        return prodBysecao;
    }
}

export { ListBySecaoService }