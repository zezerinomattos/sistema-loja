import prismaClient from "../../prisma";

class ListColaboradorService{
    async execute(){
        
        // const colaborador = await prismaClient.usuario.findMany({
        //     // VOU PEDIR PARA ELE TRAZER APENAS ID E NAME
        //     where:{
        //         colaborador:{
        //             some: {}
        //         }
        //     },
        //     select:{
        //         id: true,
        //         nome: true,               
        //     }
        // })

        const colaborador = await prismaClient.colaborador.findMany({
            // VOU PEDIR PARA ELE TRAZER APENAS ID, NAME E SITUACAO
            select: {
              situacao: true,
              usuario: {
                select: {
                  id: true,
                  nome: true,
                },
              },
            },
          });

        return colaborador;
    }
}

export { ListColaboradorService }
