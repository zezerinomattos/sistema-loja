import prismaClient from "../../prisma"

interface RelatorioFluxoCaixaRequest{
    data_inicial: Date;
    data_final: Date;
    colaborador_id: string;
}

class ListRelatorioFluxoMesDateService{
    async execute({ colaborador_id, data_inicial, data_final }: RelatorioFluxoCaixaRequest){
        const caixas = await prismaClient.caixa.findMany({
            where: {
                colaborador_id: colaborador_id,
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

export { ListRelatorioFluxoMesDateService }