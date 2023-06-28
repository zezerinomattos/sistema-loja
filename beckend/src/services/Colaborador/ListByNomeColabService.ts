import prismaClient from "../../prisma";

interface ColaboradorRequest{
    colaborador_nome: string;
}

class ListByNomeColabService{
    async execute({ colaborador_nome }: ColaboradorRequest){
        const listColabNome = await prismaClient.colaborador.findMany({
            where:{
                usuario: {
                    nome:{
                        contains: colaborador_nome
                    },
                },
            },
            select:{
                situacao: true,
                usuario:{
                    select: {
                        id: true,
                        nome: true
                    },
                },
            },
            orderBy: {
                usuario: {
                  nome: "asc", // Ordenar em ordem crescente pelo nome do representante
                },
            },
        });

        return listColabNome;
    }
}

export { ListByNomeColabService }