import prismaClient from "../../prisma";

interface FabricaRequest{
    fabrica_id: string;
    ie: string;
    contato: string
    representante_id: string;
    empresa: string;
    razaosocial: string;
}

class EditFabricaSevice{
    async execute({ fabrica_id, empresa, ie, razaosocial, contato, representante_id }: FabricaRequest){

        const updateFabrica = await prismaClient.fabrica.update({
            where: {
                id: fabrica_id
            },
            data:{
                empresa: empresa,
                ie: ie,
                razaosocial: razaosocial,
                contato: contato,
                representante_id: representante_id,
                updated_at: new Date(),
            }
        });

        return updateFabrica;
    }
}

export { EditFabricaSevice };