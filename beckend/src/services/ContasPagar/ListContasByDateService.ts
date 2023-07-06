import prismaClient from "../../prisma";

interface ContaRequest{
    data_inicial: Date;
    data_final: Date;
}

class ListContasByDateService{
    async execute({ data_inicial, data_final}: ContaRequest){

        const conta = await prismaClient.contaAPagar.findMany({
            where:{
                dataVencimento:{
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
    }
}

export { ListContasByDateService }