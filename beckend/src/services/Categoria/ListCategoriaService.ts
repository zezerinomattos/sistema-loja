import prismaClient from "../../prisma";

class ListCategoriaService{
    async execute(){

        const categoria = await prismaClient.categoria.findMany({
            select: {
                id: true,
                nome_categoria: true
            },
            orderBy: {
                nome_categoria: 'asc',
            },
        });
        return categoria;
    }
}

export { ListCategoriaService }