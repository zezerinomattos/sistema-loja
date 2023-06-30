import prismaClient from "../../prisma";

interface EntradaCaixaRequest{
    colaborador_id: string;
    valor_entrada: number;
    motivo: string;
    obs: string
    caixa_id: string
}

class CreateEntradaCaixaService{
    async execute({ colaborador_id, valor_entrada, motivo, obs, caixa_id }: EntradaCaixaRequest){

        if(!colaborador_id || !valor_entrada){
            throw new Error('Informe colaborador e valor de entrada');
        }

        if(!caixa_id){
            throw new Error('Informe o caixa que vai fazer a entrada');
        }

        const entradaCaixa = await prismaClient.entradaCaixa.create({
            data:{
                colaborador_id,
                valor_entrada,
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
                    increment: valor_entrada,
                },
            },
        });

        return { entradaCaixa, caixa }

    }
}

export { CreateEntradaCaixaService }