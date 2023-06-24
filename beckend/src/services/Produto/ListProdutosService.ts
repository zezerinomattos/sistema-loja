import prismaClient from "../../prisma";

class ListProdutosService{
    async execute(){

        const produto = await prismaClient.produto.findMany({
            select: {
                id: true,
                nome_produto: true,
                marca: true,
                preco_venda: true
            }
        });
        return produto;
    }
}

export { ListProdutosService }