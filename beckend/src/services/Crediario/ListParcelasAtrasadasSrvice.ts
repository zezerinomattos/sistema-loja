import prismaClient from "../../prisma";

class ListParcelasAtrasadasSrvice {
  async execute() {
    const currentDate = new Date();

    const parcelas = await prismaClient.parcelaCrediario.findMany({

        where: {
            status: {
                equals: true,
            },
            dataVencimento: {
                lt: currentDate
            }
        },
        select:{
            id: true,
            dataVencimento: true,
            numeroParcela: true,
            valorParcela: true,
            valorPago: true,
            status: true,
            crediario:{
                select:{
                    valorTotal: true,
                    quantidadeParcelas: true,
                    taxas_juros: true,
                    cliente:{
                        select: {
                            usuario: {
                                select: {
                                    nome: true,
                                },
                            },
                        },
                    },
                },
            },
            obs: true,
        }
    });

    const parcelasAtualizadas = parcelas.map((parcela) => {

        let valorParcelaAtualizado = parcela.valorParcela;
        const dataVencimentoParcela = new Date(parcela.dataVencimento);
        const toDay = new Date();
  
        // Verificar se a parcela está atrasada
        if (toDay > dataVencimentoParcela) {
          const diasAtraso = Math.ceil(
            (toDay.getTime() - dataVencimentoParcela.getTime()) / (1000 * 3600 * 24)
          );
          const taxaJuros = parcela.crediario.taxas_juros || 0; // Taxa de juros em porcentagem
          const juros = (taxaJuros / 100) * parcela.valorParcela; // Cálculo dos juros
  
          valorParcelaAtualizado += juros;
        }
  
        return {
          ...parcela,
          valorParcelaAtualizado,
        };
    });
  
    return { parcelas: parcelasAtualizadas };
    
  }
}

export { ListParcelasAtrasadasSrvice };



