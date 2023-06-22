import prismaClient from "../../prisma";

interface FabricaRequest{
    fabrica_id: string;
}

class DeleteFabricaService{
    async execute({ fabrica_id }: FabricaRequest){

        const fabrica = await prismaClient.fabrica.delete({
            where: {
                id: fabrica_id
            }
        });

        return fabrica;
    }
}

export { DeleteFabricaService }