import prismaClient from "../../prisma";

interface FabricaRequest{
    fabrica_id: string;
}

class DetailFabricaService{
    async execute({ fabrica_id }: FabricaRequest){

        const fabrica = await prismaClient.fabrica.findMany({
            where: {
                id: fabrica_id
            },
            include: {
                representante: {
                    select: {
                        usuario: {
                            select:{
                                nome: true
                            }
                        },
                        celular: true, 
                        telefone: true, 
                    }
                }
            }
        });

        return fabrica;
    }
}

export { DetailFabricaService }