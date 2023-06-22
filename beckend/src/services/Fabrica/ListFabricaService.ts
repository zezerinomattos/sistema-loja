import prismaClient from "../../prisma";

class ListFabricaService{
    async execute(){

        const fabrica = await prismaClient.fabrica.findMany({
            select:{
                id: true,
                empresa: true,
                representante: {
                    select:{
                        usuario:{
                            select:{
                                nome: true,
                            },
                        },
                    },
                },
            },
        });
        return fabrica;
    }
}

export { ListFabricaService };