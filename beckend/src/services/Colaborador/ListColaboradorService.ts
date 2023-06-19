import prismaClient from "../../prisma";

class ListColaboradorService{
    async execute(){
        
        const colaborador = await prismaClient.usuario.findMany({
            // VOU PEDIR PARA ELE TRAZER APENAS ID E NAME
            where:{
                colaborador:{
                    some: {}
                }
            },
            select:{
                id: true,
                nome: true
            }
        })
        return colaborador;
    }
}

export { ListColaboradorService }