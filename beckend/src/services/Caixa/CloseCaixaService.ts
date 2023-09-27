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
                status: true,
                saldo: true
            },
        });

        if(!infoCaixa || !infoCaixa.status){
            throw new Error('esse caixa não está aberto');
        }

        const valorToleranciaQuebraCaixa = valor_final - infoCaixa.saldo;

        if(valorToleranciaQuebraCaixa < (-10)){
            throw new Error('O valor de quebra de caixa é maior que $10,00, informe o quebra de caixa');
        }

        if(valorToleranciaQuebraCaixa > 10){
            throw new Error('O valor de quebra de caixa é maior que $10,00, informe o quebra de caixa');
        }

        if (valorToleranciaQuebraCaixa > -10 && valorToleranciaQuebraCaixa < 10) {

            const caixa = await prismaClient.caixa.update({
                where:{
                    id: caixa_id,
                },
                data:{
                    status: false,
                    data_fechamento: new Date(), // Atualizar a data de atualização para a data atual
                    valor_final: valor_final,
                    obs: obs,
                    saldo: valor_final
                },
            });
    
            return caixa;
        }else{

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
}

export { CloseCaixaService }