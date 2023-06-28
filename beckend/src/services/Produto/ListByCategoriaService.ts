import prismaClient from "../../prisma";

interface ProdutoRequest{
    categoria_id: string;
}

class ListByCategoriaService{
    async execute({ categoria_id }: ProdutoRequest){

        const prodByCategoria = await prismaClient.produto.findMany({
            where:{
                categoria_id: categoria_id
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
        return prodByCategoria;
    }
}

export { ListByCategoriaService }