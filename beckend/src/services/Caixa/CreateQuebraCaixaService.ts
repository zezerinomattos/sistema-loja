import prismaClient from "../../prisma";

interface QuebraCaixaRequest{
    valor: number;
    motivo: string;
    obs: string;
    caixa_id: string;
    colaborador_id: string;
}

class CreateQuebraCaixaService{
    async execute({ valor, motivo, obs, caixa_id, colaborador_id }: QuebraCaixaRequest){
        try {
            
            if(!caixa_id || !colaborador_id){
                throw new Error('Informe um caixa e um colaborador valido');
            }
    
            if(!valor){
                throw new Error('Informe o valor do quebra de caixa');
            }
    
            const caixa = await prismaClient.caixa.findUnique({
                where: {
                    id: caixa_id,
                },
                include:{
                    colaborador:{
                        select:{
                            id: true,
                            bonificacao: true,
                        },
                    },
                },
            });
    
            if(!caixa || !caixa.colaborador){
                throw new Error('Caixa ou Colaborador invalido');
            }
    
            const valorQuebraCaixa = valor - caixa.saldo;
    
            if(valorQuebraCaixa < (-10) ){
                const quebra_caixa = await prismaClient.quebraCaixa.create({
                    data:{
                        valor,
                        diferenca: valorQuebraCaixa,
                        motivo,
                        obs,
                        caixa_id,
                        colaborador_id
                    },
                });
    
                // Incrementando na bonificação do colaborador para posterior desconto
                const descontoColaborador = await prismaClient.colaborador.update({
                    where: {
                        id: colaborador_id,
                    },
                    data: {
                        bonificacao: {
                            increment: Math.abs(valorQuebraCaixa),
                        },
                    },
                });
    
                // Ajustando o saldo do caixa.
                const saldoCaixa = await prismaClient.caixa.update({
                    where: {
                        id: caixa_id,
                    },
                    data:{
                        saldo:{
                            decrement: Math.abs(valorQuebraCaixa),
                        },
                    }
                });
    
                return { quebra_caixa, descontoColaborador, saldoCaixa }
            }
    
            if(valorQuebraCaixa > 10 ){
                const quebra_caixa = await prismaClient.quebraCaixa.create({
                    data:{
                        valor,
                        diferenca: valorQuebraCaixa,
                        motivo,
                        obs,
                        caixa_id,
                        colaborador_id
                    },
                });
    
                // Ajustando o saldo do caixa.
                const saldoCaixa = await prismaClient.caixa.update({
                    where: {
                        id: caixa_id,
                    },
                    data:{
                        saldo:{
                            increment: Math.abs(valorQuebraCaixa),
                        },
                    }
                });
    
                return { quebra_caixa, saldoCaixa }
            }

        } catch (error) {
            console.log(error);
        }
        
    }
}

export { CreateQuebraCaixaService }