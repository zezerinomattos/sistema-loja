import prismaClient from "../../prisma";

class ListParcelasAtrasatasFullService{
    async execute(){
        const parcelas = await prismaClient.parcelaCrediario.findMany({
            where: {
                status: true,
            },
            orderBy:{
                dataVencimento: 'desc',
            },
        });

        let valorCrediarioAtualizado = 0;

        parcelas.forEach((parcela) => {
            valorCrediarioAtualizado += parcela.valorParcela;
        });

        return{ parcelas, valorCrediarioAtualizado };
    }
}

export { ListParcelasAtrasatasFullService }