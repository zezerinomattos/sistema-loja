import prismaClient from "../../prisma";

interface RetiradaCaixaRequest{
    colaborador_id: string;
    valor_retirado: number;
    motivo: string;
    obs: string
    caixa_id: string
}

class CrateRetiradaCaixaService{
    async execute({ colaborador_id, valor_retirado, motivo, obs, caixa_id }: RetiradaCaixaRequest){
        
        if(!colaborador_id || !valor_retirado){
            throw new Error('Informe colaborador e valor a ser retirado');
        }

        const retiradaCaixa = await prismaClient.retiradaCaixa.create({
            data:{
                colaborador_id,
                valor_retirado,
                motivo,
                obs,
                caixa: {
                    connect:{
                        id: caixa_id,
                    },
                },
            },
        });

        const caixa = await prismaClient.caixa.update({
            where: {
                id: caixa_id,
            },
            data:{
                saldo: {
                    decrement: valor_retirado,
                },
            },
        });

        return { retiradaCaixa, caixa }

    }
}

export { CrateRetiradaCaixaService }