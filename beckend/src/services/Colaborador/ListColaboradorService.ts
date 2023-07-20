import prismaClient from "../../prisma";

class ListColaboradorService{
    async execute(){
        
        const colaborador = await prismaClient.colaborador.findMany({
            // VOU PEDIR PARA ELE TRAZER APENAS ID, NAME E SITUACAO
            select: {
              id: true,
              situacao: true,
              usuario: {
                select: {
                  id: true,
                  nome: true,
                },
              },
            },
            orderBy: {
              usuario: {
                nome: "asc", // Ordenar em ordem crescente pelo nome do representante
              },
            },
          });

        return colaborador;
    }
}

export { ListColaboradorService }
