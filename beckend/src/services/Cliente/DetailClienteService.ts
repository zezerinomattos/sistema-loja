import prismaClient from "../../prisma";

interface ClienteRequest{
    cliente_id: string;
}

class DetailClienteService{
    async execute({ cliente_id }: ClienteRequest){

        const cliente = await prismaClient.usuario.findMany({
            where:{
                //id: cliente_id
                cliente: {
                    some:{
                        id: cliente_id,
                    }
                }
            },
            include:{
                cliente: true,
                endereco: true
            }
        });
        if(!cliente[0].cliente[0]){
            throw new Error('ID do cliente inválido');
        }
        return cliente;
    }
}

export { DetailClienteService }