import prismaClient from "../../prisma";

interface RelatorioFluxoCaixaRequest{
    data_inicial: Date;
    data_final: Date;
}

class ListRelatorioFluxoCaixaDateService{
    async execute({ data_inicial, data_final }: RelatorioFluxoCaixaRequest){
        const caixas = await prismaClient.caixa.findMany({
            where: {
              data_abertura: {
                gte: data_inicial,
                lte: data_final,
              },
            },
          });
        return caixas;
    }
}

export { ListRelatorioFluxoCaixaDateService }