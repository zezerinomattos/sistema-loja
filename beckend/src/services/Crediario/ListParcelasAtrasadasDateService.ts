import prismaClient from "../../prisma";

interface ParcelasRequest{
    cliente_id?: string;
    data_inicial: Date;
    data_final: Date;
}

class ListParcelasAtrasadasDateService{
    async execute({ cliente_id, data_inicial, data_final}: ParcelasRequest){
        if(cliente_id){
            const parcelas = await prismaClient.parcelaCrediario.findMany({
                where: {
                    crediario:{
                        cliente_id: cliente_id,
                    },
                    status: true,
                    dataVencimento: {
                        gte: data_inicial,
                        lte: data_final,
                    }
                },

                orderBy:{
                    dataVencimento: 'desc',
                },
            });

            let valorCrediarioAtualizado = 0;

            parcelas.forEach((parcela) => {
                valorCrediarioAtualizado += parcela.valorParcela;
            });

            return { parcelas, valorCrediarioAtualizado }

        }else{
            const parcelas = await prismaClient.parcelaCrediario.findMany({
                where: {
                    status: true,
                    dataVencimento: {
                        gte: data_inicial,
                        lte: data_final,
                    }
                },
                orderBy:{
                    dataVencimento: 'desc',
                },
            });

            let valorCrediarioAtualizado = 0;

            parcelas.forEach((parcela) => {
                valorCrediarioAtualizado += parcela.valorParcela;
            });

            return { parcelas, valorCrediarioAtualizado }
        }
    }
}

export { ListParcelasAtrasadasDateService }