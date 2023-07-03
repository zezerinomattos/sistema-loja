import prismaClient from "../../prisma";

interface RelatorioCaixa{
    caixa_id: string;
}

class ListRelatorioFluxoCaixaService{
    async execute({ caixa_id }: RelatorioCaixa){
        const caixa = await prismaClient.caixa.findFirst({
            where: {
                id: caixa_id,
            },
            include: {
                entradacaixa: true,
                entradacartao: true,
                retiradacaixa: true,
                registrocaixa: true,
                quebraCaixa: true,
            },
        });

        return caixa;
    }
}

export { ListRelatorioFluxoCaixaService }