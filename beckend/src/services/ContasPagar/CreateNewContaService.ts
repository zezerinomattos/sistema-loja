import prismaClient from "../../prisma";

interface NewContaRequest{
    nome: string;
    valor: number;
    dataVencimento: Date;
    categoria: string;
    status: string;
    observacao?: string;
}

class CreateNewContaService{
    async execute({ nome, valor, dataVencimento, categoria, status, observacao }: NewContaRequest){
        const newContaPagar = await prismaClient.contaAPagar.create({
            data:{
                nome,
                valor, 
                dataVencimento,
                categoria,
                status,
                observacao,
            },
        });

        return newContaPagar;
    }
}

export { CreateNewContaService }