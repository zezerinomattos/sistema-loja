import prismaClient from "../../prisma";

interface CaixaRequest{
    valor_final: number;
    obs: string;
    caixa_id: string
}

class CloseCaixaService{
    async execute({ caixa_id , valor_final, obs }: CaixaRequest){
        // Vericicando se caixa está aberto
        const infoCaixa = await prismaClient.caixa.findFirst({
            where: {
                id: caixa_id
            },
            select: {
                status: true
            },
        });

        if(!infoCaixa.status){
            throw new Error('esse caixa não está aberto');
        }

        const caixa = await prismaClient.caixa.update({
            where:{
                id: caixa_id,
            },
            data:{
                status: false,
                data_fechamento: new Date(), // Atualizar a data de atualização para a data atual
                valor_final: valor_final,
                obs: obs,
            },
        });

        return caixa;
    }
}

export { CloseCaixaService }