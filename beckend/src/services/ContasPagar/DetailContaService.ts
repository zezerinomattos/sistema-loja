import prismaClient from "../../prisma";

interface ContaRequest{
    conta_id: string;
}

class DetailContaService{
    async execute({ conta_id }: ContaRequest){

        const conta = await prismaClient.contaAPagar.findFirst({
            where: {id: conta_id},
        });
        if(!conta){
            throw new Error('Conta não encontrada');
        }

        return conta;
    }
}

export { DetailContaService }