import prismaClient from "../../prisma";

class ListRepresentanteService{
    async execute(){

        const representante = await prismaClient.representante.findMany({
            // VOU PEDIR PARA ELE TRAZER APENAS ID, NoME E EMPRESA
            select: {
                empresa: true,
                usuario: {
                    select: {
                        nome: true,
                        id: true,
                    },
                },
            },
            orderBy: {
                usuario: {
                  nome: "asc", // Ordenar em ordem crescente pelo nome do representante
                },
            },
        });
        return representante;
    }
}

export { ListRepresentanteService }