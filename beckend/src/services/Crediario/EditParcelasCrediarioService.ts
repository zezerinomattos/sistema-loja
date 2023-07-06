import prismaClient from "../../prisma";

interface ParcelasRequest{
    parcela_id: string;
    dataPagamento: Date;
    formaPagamento: string;
    plataforma_pagamento?: string
    caixaRecebimentoId: string;
    obs?: string
    entradacartao_id?: string;
    valor_recebido?: number;
}

class EditParcelasCrediarioService{
    async execute({ parcela_id, dataPagamento, formaPagamento, caixaRecebimentoId, obs, plataforma_pagamento, entradacartao_id, valor_recebido }: ParcelasRequest){
        if(!parcela_id){
            throw new Error('Informe a parcela');
        }

        if(!parcela_id || !dataPagamento || !formaPagamento || !caixaRecebimentoId){
            throw new Error('Informe os dados necessarios');
        }

        const parcela = await prismaClient.parcelaCrediario.findFirst({
            where: {
                id: parcela_id,
            },
            include: { crediario: true },
        });

        //Verifica se a parcela está em aberto
        if(!parcela.status){
            throw new Error('Parcela não está em aberto');
        }

        // Se a parcela for a ultima fechamos o crediario
        if(parcela.numeroParcela === parcela.crediario.quantidadeParcelas){
            const crediario = await prismaClient.crediario.update({
                where: {
                    id: parcela.crediario.id,
                },
                data:{
                    status: "PAGO",
                },
            });
        }
      
        let valorParcelaAtualizado = parcela.valorParcela;
        const dataVencimentoParcela = new Date(parcela.dataVencimento);

        // Verificar se a parcela está atrasada
        if (dataPagamento > dataVencimentoParcela) {
            const diasAtraso = Math.ceil((dataPagamento.getTime() - dataVencimentoParcela.getTime()) / (1000 * 3600 * 24));
            const taxaJuros = parcela.crediario.taxas_juros || 0; // Taxa de juros em porcentagem
            const juros = (taxaJuros / 100) * parcela.valorParcela; // Cálculo dos juros
    
            valorParcelaAtualizado += juros;
        }

        // Atualizando parcela
        const updatedParcela = await prismaClient.parcelaCrediario.update({
            where: { id: parcela.id },
            data: {
              status: false,
              dataPagamento,
              valorPago: valorParcelaAtualizado,
              formaPagamento,
            },
        });

        // CARTÃO ---------------------------------------------
        // Atualizar saldo do caixa se a forma de pagamento for em dinheiro
        if (formaPagamento === "DINHEIRO") {
            const caixa = await prismaClient.caixa.findUnique({ 
                where: { id: parcela.crediario.caixa_id } 
            });

            if (!caixa) {
                throw new Error("Caixa não encontrado.");
            }

            if(!caixa.status){
                throw new Error("Caixa está fechado");
            }
    
            const novoSaldo = caixa.saldo + valorParcelaAtualizado;
    
            const updateCaixa = await prismaClient.caixa.update({
                where: { id: caixaRecebimentoId },
                data: { saldo: novoSaldo },
            });
    
            // Registrar o pagamento no registro de caixa
            const updateRegistroCaixa = await prismaClient.registroCaixa.create({
                data: {
                    order_id: parcela.crediario.order_id,
                    valor_recebido: valorParcelaAtualizado,
                    troco: 0,
                    forma_pagamento: formaPagamento,
                    plataforma_pagamento,
                    caixa_id: caixaRecebimentoId,
                    obs,
                    status: true,
                },
            });

            return {
                updatedParcela,
                parcela,
                updateRegistroCaixa,
                updateCaixa
            }
        }

        // CARTÃO ---------------------------------------------

        if(formaPagamento === "CARTÃO"){
            const caixa = await prismaClient.caixa.findUnique({ 
                where: { id: parcela.crediario.caixa_id } 
            });

            if (!caixa) {
                throw new Error("Caixa não encontrado.");
            }

            if (!entradacartao_id) {
                throw new Error("Informe o ID de entrada de cartão");
            }

            const valorCartao = await prismaClient.entradaCartao.findUnique({
                where: {id: entradacartao_id},
                select:{valor_entrada: true},
            });

            if (!valorCartao) {
                throw new Error("Entrada de cartão não encontrada");
            }

            // Calculando valor cartão + dinheiro
            const trocoCartao = valorCartao.valor_entrada + valor_recebido;

            if(formaPagamento === "CARTÃO" && trocoCartao < valorParcelaAtualizado){
                throw new Error('Valor invalido');
            }

            const novoSaldo = caixa.saldo + valorParcelaAtualizado - valorCartao.valor_entrada;
    
            const updateCaixa = await prismaClient.caixa.update({
                where: { id: caixaRecebimentoId },
                data: { saldo: novoSaldo },
            });
            
            // Registrar o pagamento no registro de caixa
            const updateRegistroCaixa = await prismaClient.registroCaixa.create({
                data: {
                    order_id: parcela.crediario.order_id,
                    valor_recebido: valorParcelaAtualizado,
                    troco: 0,
                    forma_pagamento: formaPagamento,
                    plataforma_pagamento,
                    caixa_id: caixaRecebimentoId,
                    obs,
                    status: true,
                },
            });

            return {
                updatedParcela,
                parcela,
                updateRegistroCaixa,
                updateCaixa
            }
        }

        
    }
}

export { EditParcelasCrediarioService }