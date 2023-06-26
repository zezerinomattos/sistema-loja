import prismaClient from "../../prisma";

interface ProdutoRequest{
    produto_id: string;
}

class DeleteProdutoService{
    async execute({ produto_id }: ProdutoRequest){

        // Obter os IDs dos produtoCor relacionados ao produto
        const existingProduto = await prismaClient.produto.findUnique({
            where: {
                id: produto_id
            },
        });

        if(!existingProduto){
            throw new Error('Produto not found');
        }

        // Obter os IDs dos produtoCor relacionados ao produto
        const produtoCoress = await prismaClient.produtoCor.findMany({
            where: {
                produto_id: produto_id,
            },
            select: {
                id: true,
            },
        });
        
        // Extrair os IDs dos produtoCor
        const produtoCorIds = produtoCoress.map((produtoCor) => produtoCor.id);
        
        // Deletar os tamanhos e estoque relacionados aos produtoCor
        const tamanho = await prismaClient.produtoTamanhoEstoque.deleteMany({
            where: {
                produtoCor_id: {
                    in: produtoCorIds,
                },
            },
        });
        
        // Deletar as cores relacionadas ao produto
        const cor = await prismaClient.produtoCor.deleteMany({
            where: {
                produto_id: produto_id,
            },
        });

        const produto = await prismaClient.produto.delete({
            where: {
                id: produto_id
            },
        });

        return { produto}

    }
}

export { DeleteProdutoService }