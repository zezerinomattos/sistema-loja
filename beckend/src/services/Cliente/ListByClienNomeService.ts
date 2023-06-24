import prismaClient from "../../prisma";

interface ClienteRequest{
    nome_cliente: string;
}

class ListByClienNomeService{
    async execute({ nome_cliente }: ClienteRequest){
        const listNomeCliente  = await prismaClient.cliente.findMany({
            where: {
                usuario:{
                    nome: {
                        contains: nome_cliente
                    },
                },
            },
            select:{
                situacao: true,
                usuario:{
                    select: {
                        id: true,
                        nome: true
                    },
                },
            },
        });

        return listNomeCliente;
    }
}

export { ListByClienNomeService }