import prismaClient from "../../prisma";

class ListFullContaService{
    async execute(){

        const conta = await prismaClient.contaAPagar.findMany({
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

export { ListFullContaService }