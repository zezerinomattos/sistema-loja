import prismaClient from "../../prisma";

interface ContaRequest{
    categoria: string;
    data_inicial?: Date;
    data_final?: Date;
}

class ListContasByCategoriaService{
    async execute({ data_inicial, data_final ,categoria }: ContaRequest){

        if(!categoria){
            throw new Error('Informe a categoria');
        }

        if(data_inicial && data_final && categoria){
            const conta = await prismaClient.contaAPagar.findMany({
                where:{
                    categoria: categoria,
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
                    categoria: categoria,
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

export { ListContasByCategoriaService }