import prismaClient from "../../prisma";

class ListClienteService{
    async execute(){
        const cliente = await prismaClient.cliente.findMany({
            // VOU PEDIR PARA ELE TRAZER APENAS ID, NAME E SITUACAO
            select: {
                id: true,
                situacao: true,
                ultima_compra: true,
                usuario:{
                    select:{
                        id: true,
                        nome: true
                    },
                },
            },
            orderBy: {
                usuario: {
                  nome: "asc", // Ordenar em ordem crescente pelo nome do cliente
                },
            },
        });
        return cliente;
    }
}

export { ListClienteService }