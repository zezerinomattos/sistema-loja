import prismaClient from "../../prisma";

interface ContaRequest{
    status: string;
    data_inicial?: Date;
    data_final?: Date;
}

class ListContasByStatusService{
    async execute({ data_inicial, data_final ,status }: ContaRequest){

        if(!status){
            throw new Error('Informe o status');
        }

        if(data_inicial && data_final && status){
            const conta = await prismaClient.contaAPagar.findMany({
                where:{
                    status: status,
                    dataVencimento: {
                        gte: data_inicial,
                        lte: data_final,
                    },
                },
                orderBy:{
                    dataVencimento: 'desc',
                },
            });
            if(!conta){
                throw new Error('Conta não encontrada');
            }
    
            return conta;

        }else{

            const conta = await prismaClient.contaAPagar.findMany({
                where:{
                    status: status,
                },
                orderBy:{
                    dataVencimento: 'desc',
                },
            });
            if(!conta){
                throw new Error('Conta não encontrada');
            }
    
            return conta;
        }

    }
}

export { ListContasByStatusService }