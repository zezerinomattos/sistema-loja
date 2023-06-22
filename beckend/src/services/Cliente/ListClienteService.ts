import prismaClient from "../../prisma";

class ListClienteService{
    async execute(){
        const cliente = await prismaClient.cliente.findMany({
            // VOU PEDIR PARA ELE TRAZER APENAS ID, NAME E SITUACAO
            select: {
                situacao: true,
                usuario:{
                    select:{
                        id: true,
                        nome: true
                    },
                },
            },
        });
        return cliente;
    }
}

export { ListClienteService }