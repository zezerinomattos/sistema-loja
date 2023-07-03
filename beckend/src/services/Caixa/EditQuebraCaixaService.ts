import prismaClient from "../../prisma";

interface QuebraCaixaRequest{
    quebraCaixa_id: string;
    motivo_reversao: string;
}

class EditQuebraCaixaService{
    async execute({ quebraCaixa_id, motivo_reversao}: QuebraCaixaRequest){
        if(!quebraCaixa_id ){
            throw new Error('Informe um registro de quebra de caixa valido');
        }

        const quebra_caixa = await prismaClient.quebraCaixa.findUnique({
            where: {
                id: quebraCaixa_id
            },
            include: {
                caixa: {
                    select: {
                        id: true,
                        saldo: true,
                        valor_final: true,
                        colaborador: {
                            select:{
                                id: true,
                                bonificacao: true
                            },
                        },
                    },
                },
            },
        });

        if(!quebra_caixa){
            throw new Error('Registro de qubra de caixa invalido');
        }

        const diferencaQuebraCaixa = quebra_caixa.diferenca;

        if(diferencaQuebraCaixa < (-0) ){

            const quebraCaixa = await prismaClient.quebraCaixa.update({
                where: {
                    id: quebraCaixa_id,
                },
                data: {
                    status: false,
                    motivo_reversao,
                }
            });

            const saldoCaixa = await prismaClient.caixa.update({
                where: {
                    id: quebra_caixa.caixa_id,
                },
                data:{
                    saldo:{
                        increment: Math.abs(diferencaQuebraCaixa),
                    },
                }
            });

            const descontoColaborador = await prismaClient.colaborador.update({
                where: {
                    id: quebra_caixa.colaborador_id,
                },
                data: {
                    bonificacao: {
                        decrement: Math.abs(diferencaQuebraCaixa),
                    },
                },
            });

            return {
                quebraCaixa, 
                saldoCaixa,
                descontoColaborador
            }
        }else{
            const quebraCaixa = await prismaClient.quebraCaixa.update({
                where: {
                    id: quebraCaixa_id,
                },
                data: {
                    status: false,
                    motivo_reversao
                }
            });

            const saldoCaixa = await prismaClient.caixa.update({
                where: {
                    id: quebra_caixa.caixa_id,
                },
                data:{
                    saldo:{
                        decrement: Math.abs(diferencaQuebraCaixa),
                    },
                }
            });

            return {
                quebraCaixa, 
                saldoCaixa,
            }
        }

    }
}

export { EditQuebraCaixaService }