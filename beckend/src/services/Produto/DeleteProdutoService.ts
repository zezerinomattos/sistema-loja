import prismaClient from "../../prisma";

interface ProdutoRequest{
    produto_id: string;
}

class DeleteProdutoService{
    async execute({ produto_id }: ProdutoRequest){

        // Verificar se o produto existe
        const existingProduto = await prismaClient.produto.findUnique({
            where: {
                id: produto_id
            },
        });

        if(!existingProduto){
            throw new Error('Produto not found');
        }

        await prismaClient.produtoTamanhoEstoque.deleteMany({
            where:{
                produto_id: produto_id,
            },
        });

        await prismaClient.produtoCor.deleteMany({
            where: {
            produto_id: produto_id,
            },
        });

        const produto = await prismaClient.produto.delete({
            where: {
                id: produto_id
            },
        });

        return produto;
    }
}

export { DeleteProdutoService }