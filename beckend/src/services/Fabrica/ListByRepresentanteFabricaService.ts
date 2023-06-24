import prismaClient from "../../prisma";

interface FabricaRequest{
    representante_id: string;
}

class ListByRepresentanteFabricaService{
    async execute({ representante_id }: FabricaRequest){

        const fabricaByRepresentante = await prismaClient.fabrica.findMany({
            where:{
                representante_id: representante_id
            },
            select:{
                id: true,
                empresa: true,
                representante:{
                    select:{
                        usuario:{
                            select: {
                                nome: true
                            },
                        },
                    },
                },
            },
        });
        return fabricaByRepresentante;
    }
}

export { ListByRepresentanteFabricaService }