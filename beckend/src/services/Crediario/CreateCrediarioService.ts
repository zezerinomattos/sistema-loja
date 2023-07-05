import prismaClient from "../../prisma";

interface CrediarioRequest{
    valorTotal: number;
    quantidadeParcelas: number;
    dataVencimento: Date; //Data de vencimento inicial
    taxas_juros?: number;
    prazos?: string;
    obs?: string;
    cliente_id: string;
    order_id: string;
    caixa_id: string;
}

class CreateCrediarioService{
    async execute({ valorTotal, quantidadeParcelas, dataVencimento, taxas_juros, prazos, obs, cliente_id, order_id, caixa_id }: CrediarioRequest){
        
        if(!valorTotal || !quantidadeParcelas || !order_id || !cliente_id || !caixa_id ){
            throw new Error('Informe todos os dados obrigatórios, valor total, numero de parcelas, data vencimento da primeira parcela, o Id da order, Id do cliente, Id caixa');
        }

        try {
            
            const valorParcela = valorTotal / quantidadeParcelas;
            const crediario = await prismaClient.crediario.create({
                data:{
                    valorTotal,
                    quantidadeParcelas,
                    valorParcela: valorParcela,
                    dataVencimento: [],
                    taxas_juros,
                    prazos,
                    obs,
                    cliente_id,
                    order_id,
                    caixa_id
                },
            });

            // Calcula as datas de vencimento
            const datasVencimento: Date[] = [];
            let novaDataVencimento = new Date(dataVencimento); // Cria uma cópia da dataVencimento

            for (let i = 0; i < quantidadeParcelas; i++) {
                datasVencimento.push(new Date(novaDataVencimento)); // Adiciona a novaDataVencimento ao array
                novaDataVencimento.setMonth(novaDataVencimento.getMonth() + 1); // Incrementa o mês para a próxima parcela
            }

            // Atualiza o campo dataVencimento do crediario com o array de datas
            const crediarioAtualizado = await prismaClient.crediario.update({
                where: { id: crediario.id },
                data: { dataVencimento: datasVencimento },
            });

            // CRIANDO AS PARCELAS
            const parcelaCrediarioPromises = [];

            for (let i = 0; i < quantidadeParcelas; i++) {
                const numeroParcela = i + 1;
                const novaDataVencimento = new Date(dataVencimento);
                novaDataVencimento.setMonth(novaDataVencimento.getMonth() + i);

                const parcelaCrediarioPromise = prismaClient.parcelaCrediario.create({
                    data: {
                        numeroParcela,
                        valorParcela,
                        dataVencimento: novaDataVencimento,
                        valorPago: 0, // Valor inicialmente definido como 0
                        formaPagamento: '', // Forma de pagamento inicialmente vazia
                        taxas_juros: 0, // Valor inicialmente definido como 0
                        obs: '', // Observação inicialmente vazia
                        crediario: {
                            connect: {
                            id: crediario.id,
                            },
                        },
                    },
                });

                parcelaCrediarioPromises.push(parcelaCrediarioPromise);
            }

            const parcelasCrediario = await Promise.all(parcelaCrediarioPromises);

            return {
                crediario,
                crediarioAtualizado,
                parcelasCrediario
            }

        } catch (error) {
            console.log('Aconteceu um erro inesperado: ' + error);
        }
    }
}

export { CreateCrediarioService }