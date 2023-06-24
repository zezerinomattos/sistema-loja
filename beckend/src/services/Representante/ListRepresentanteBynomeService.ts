import prismaClient from "../../prisma";

interface RepresentanteRequest{
    representante_nome: string;
}

class ListRepresentanteBynomeService{
    async execute({ representante_nome }: RepresentanteRequest){
        const listByNomeRepresentante = await prismaClient.representante.findMany({
            where:{
                usuario:{
                    nome:{
                        contains: representante_nome
                    },
                },
            },
            select:{
                id: true,
                empresa: true,
                usuario:{
                    select:{
                        nome: true
                    },
                },
            },
        });
        return listByNomeRepresentante;
    }
}

export { ListRepresentanteBynomeService }