import prismaClient from "../../prisma";

interface RelatorioCaixa{
    colaborador_id: string;
}

class ListRelatorioFluxoCaixaMesService{
    async execute({ colaborador_id }: RelatorioCaixa){
        const caixa = await prismaClient.caixa.findMany({
            where: {
                colaborador_id: colaborador_id,
            },
            orderBy: {
                data_abertura: 'desc'
            },
        });

        return caixa;
    }
}

export { ListRelatorioFluxoCaixaMesService }