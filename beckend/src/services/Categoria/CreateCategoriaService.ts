import prismaClient from "../../prisma";

interface CategoriaRequest{
    nome_categoria: string;
}

class CreateCategoriaService{
    async execute({ nome_categoria }: CategoriaRequest){

        if(nome_categoria === ''){
            throw new Error('Nome invalido')
        }

        // Verificar se a categoria já existe
        const existingCategoria = await prismaClient.categoria.findFirst({
            where: { nome_categoria },
        });

        if(existingCategoria){
            throw new Error("Categoria já cadastrada");
        }


        const categoria = await prismaClient.categoria.create({
            data: {
                nome_categoria: nome_categoria
            },
            select: {
                id: true,
                nome_categoria: true
            }
        });

        return categoria;
    }
}

export { CreateCategoriaService }