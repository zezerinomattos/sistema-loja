import prismaClient from "../../prisma";

interface CaixaRequest{
    obs: string;
    colaborador_id: string;
}

class CreateCaixaService{
    async execute({ obs, colaborador_id }: CaixaRequest){

        // RECUPERANDO SALDO DO DIA ANTERIOR
        const caixaAnterior = await prismaClient.caixa.findFirst({
            where: {
                colaborador_id: colaborador_id,
            },
            select:{
                valor_final: true,
                status: true,
            },
            orderBy: {
                data_fechamento: 'desc',
            },
        });
        
        const saldo_anterior = caixaAnterior?.valor_final ?? 0;
        const statusCaixa = caixaAnterior.status;

        if(statusCaixa){
            throw new Error('O caixa já está aberto');
        }

        if(saldo_anterior !== 0){
            const caixa = await prismaClient.caixa.create({
                data: {
                    valor_inicial: saldo_anterior,
                    obs: obs,
                    colaborador_id: colaborador_id,
                },
            });

            return caixa;

        }else {
            const caixa = await prismaClient.caixa.create({
                data: {
                    obs: obs,
                    colaborador_id: colaborador_id,
                },
            });
    
            return caixa;
        }       
    }
}

export { CreateCaixaService }
