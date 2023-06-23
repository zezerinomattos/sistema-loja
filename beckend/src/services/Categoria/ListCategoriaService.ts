import prismaClient from "../../prisma";

class ListCategoriaService{
    async execute(){

        const categoria = await prismaClient.categoria.findMany({
            select: {
                id: true,
                nome_categoria: true
            }
        });
        return categoria;
    }
}

export { ListCategoriaService }