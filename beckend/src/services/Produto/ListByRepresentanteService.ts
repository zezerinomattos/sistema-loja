import prismaClient from "../../prisma";

interface ProdutoRequest{
    representante_id: string;
}

class ListByRepresentanteService{
    async execute({ representante_id }: ProdutoRequest){
        const listProdMarca = await prismaClient.produto.findMany({
            where: {
                representante_id: representante_id
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
                },
                representante:{
                    select:{
                        usuario:{
                            select: {
                                nome: true
                            }
                        }
                    }
                }
            },
        });

        return listProdMarca
    }
}

export { ListByRepresentanteService }