import prismaClient from "../../prisma";

interface CategoriaRequest{
    categoria_id: string;
}

class DeleteCategoriaService{
    async execute({ categoria_id }: CategoriaRequest){

        const categoria = await prismaClient.categoria.delete({
            where: {
                id: categoria_id
            }
        });

        return categoria;
    }
}

export { DeleteCategoriaService }