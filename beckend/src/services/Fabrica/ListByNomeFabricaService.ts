import prismaClient from "../../prisma";

interface FabricaRequest{
    fabrica_id: string;
}

class ListByNomeFabricaService{
    async execute({ fabrica_id }: FabricaRequest){
        const listNomeFabrica = await prismaClient.fabrica.findMany({
            where:{
                empresa: {
                    contains: fabrica_id
                },
            },
            select:{
                id: true,
                empresa: true,
                representante:{
                    select:{
                        usuario:{
                            select:{
                                nome: true
                            },
                        },
                    },
                },
            },
        });

        return listNomeFabrica
    }
}

export { ListByNomeFabricaService }