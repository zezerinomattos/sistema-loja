import prismaClient from "../../prisma";

class ListRelatorioFluxoCaixaFullService{
    async execute(){
        const caixa = await prismaClient.caixa.findMany({
            orderBy: {
                data_abertura: 'desc'
            },
        });

        return caixa;
    }
}

export { ListRelatorioFluxoCaixaFullService }