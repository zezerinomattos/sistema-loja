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
        });
        return representante;
    }
}

export { ListRepresentanteService }