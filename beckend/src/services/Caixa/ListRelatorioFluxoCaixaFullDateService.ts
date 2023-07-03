import prismaClient from "../../prisma";

interface RelatorioFluxoCaixaRequest{
    data_inicial: Date;
    data_final: Date;
}

class ListRelatorioFluxoCaixaFullDateService{
    async execute({ data_inicial, data_final }: RelatorioFluxoCaixaRequest){
        const caixas = await prismaClient.caixa.findMany({
            where: {
              data_abertura: {
                gte: data_inicial,
                lte: data_final,
              },
            },
            orderBy: {
                data_abertura: 'desc'
            },
          });
        return caixas;
    }
}

export { ListRelatorioFluxoCaixaFullDateService }