import prismaClient from "../../prisma";

interface RegistroCaixaRequest{
    order_id: string;
    valor_recebido: number;
    forma_pagamento: string;
    bandera_pagamento?: string;
    obs?: string;
    caixa_id: string;
    entradacartao_id?: string;
    crediario_id?: string
}

class CreateRegistroCaixaService{
    async execute({ order_id, valor_recebido, forma_pagamento, bandera_pagamento, obs, caixa_id, entradacartao_id, crediario_id }: RegistroCaixaRequest){

        if(order_id === '' || caixa_id === ''){
            throw new Error('Informe o ID de caixa e order');
        }
        
        const valorOrder = await prismaClient.order.findUnique({
            where: {
                id: order_id
            },
            select:{
                id: true,
                valor_pagar: true,
                status: true,
                draft: true,

                colaborado:{
                    select: {
                        id: true,
                        complemento_salario: true,
                        bonificacao: true
                    },
                },
                cliente: { // mudei
                    select:{
                        id: true,
                    }
                }
            },
        });

        if(!valorOrder){
            throw new Error('Order não encontrada');
        }

        if(valorOrder.status){
            throw new Error('Order já finalizada');
        }

        if(valorOrder.draft){
            throw new Error('Order em rascunho');
        }

        try {
            
            // CARTÃO ---------------------------------------------

            if(forma_pagamento === "CARTÃO"){
                
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

                let saldoTrocoCartao = trocoCartao - valorOrder.valor_pagar;
                if(saldoTrocoCartao < 0){
                    saldoTrocoCartao = 0;
                }

                if(forma_pagamento === "CARTÃO" && trocoCartao < valorOrder.valor_pagar){
                    throw new Error('Valor invalido');
                }

                const registroCaixa = await prismaClient.registroCaixa.create({
                    data:{
                        order_id: order_id,
                        valor_recebido: trocoCartao,
                        troco: saldoTrocoCartao,
                        forma_pagamento: forma_pagamento,
                        plataforma_pagamento: bandera_pagamento,
                        obs: obs,
                        status: true,
                        caixa:{
                            connect:{id: caixa_id}
                        },
                        entradacartao:{
                            connect:{id: entradacartao_id}
                        },
                    },
                });
                
                // Incrementando valor de saldo na tabela Caixa
                const valorIncremento = valor_recebido - saldoTrocoCartao;

                const caixa = await prismaClient.caixa.update({
                    where: {id: caixa_id},
                    data: {
                        saldo:{
                            increment: valorIncremento,
                        },
                    },
                });

                const order = await prismaClient.order.update({
                    where: {id: order_id},
                    data:{status: true}
                });

                // Incrementando a comisão do colaborador
                const comissaoColaborador = (valorOrder.colaborado.complemento_salario / 100) * valorOrder.valor_pagar;
                const colaborador = await prismaClient.colaborador.update({
                    where:{
                        id: valorOrder.colaborado.id,
                    },
                    data:{
                        bonificacao: comissaoColaborador,
                        total_vendas_mes: {
                            increment: valorOrder.valor_pagar,
                        }
                    },
                    select:{
                        id: true,
                        bonificacao: true,
                        usuario:{
                            select: {
                                nome: true,
                            },
                        },
                    },
                });

                // REGISTRANDO A DATA DA ULTIMA COMPRA,
                const cliente = await prismaClient.cliente.update({
                    where: {
                        id: valorOrder.cliente.id,
                    },
                    data: {
                        ultima_compra: new Date(),
                    }
                });

                // Trazendo para criar o comprovante de pagamento do cliente
                const itemsOrder = await prismaClient.order.findFirst({
                    where: {id: order_id},
                    select:{
                        items: true,
                    },
                });
        
                return { registroCaixa, order, caixa, colaborador, itemsOrder}

            }

            // DINHEIRO ---------------------------------------------

            if(forma_pagamento === "DINHEIRO"){

                if(valor_recebido < valorOrder.valor_pagar){
                    throw new Error('Valor invalido');
                }
        
                // Calculando o troco em dinheiro
                let saldoTroco = valor_recebido - valorOrder.valor_pagar;
                if( saldoTroco < 0){
                    saldoTroco = 0;
                }

                const registroCaixa = await prismaClient.registroCaixa.create({
                    data:{
                        order_id: order_id,
                        valor_recebido: valor_recebido,
                        troco: saldoTroco,
                        forma_pagamento: forma_pagamento,
                        plataforma_pagamento: bandera_pagamento,
                        obs: obs,
                        status: true,
                        caixa:{
                            connect:{id: caixa_id}
                        },
                    },
                });

                // Incrementando valor de saldo na tabela Caixa
                const valorIncremento = valor_recebido - saldoTroco;

                const caixa = await prismaClient.caixa.update({
                    where: {id: caixa_id},
                    data: {
                        saldo:{
                            increment: valorIncremento,
                        }
                    }
                })

                const order = await prismaClient.order.update({
                    where: {id: order_id},
                    data:{status: true}
                });

                // Incrementando a comisão do colaborador
                const comissaoColaborador = (valorOrder.colaborado.complemento_salario / 100) * valorOrder.valor_pagar;
                const colaborador = await prismaClient.colaborador.update({
                    where:{
                        id: valorOrder.colaborado.id,
                    },
                    data:{
                        bonificacao: comissaoColaborador,
                        total_vendas_mes: {
                            increment: valorOrder.valor_pagar,
                        }
                    },
                    select:{
                        id: true,
                        bonificacao: true,
                        usuario:{
                            select: {
                                nome: true,
                            },
                        },
                    },
                });

                // REGISTRANDO A DATA DA ULTIMA COMPRA,
                const cliente = await prismaClient.cliente.update({
                    where: {
                        id: valorOrder.cliente.id,
                    },
                    data: {
                        ultima_compra: new Date(),
                    }
                });

                // Trazendo para criar o comprovante de pagamento do cliente
                const itemsOrder = await prismaClient.order.findFirst({
                    where: {id: order_id},
                    select:{
                        items: true,
                    },
                });

                return { registroCaixa, order, caixa, colaborador, itemsOrder}

            }

            // CREDIARIO ---------------------------------------------

            if(forma_pagamento === "CREDIARIO"){
                if (!crediario_id) {
                    throw new Error("Informe o ID de entrada de CREDIÁRIO");
                }

                const valorCrediario = await prismaClient.crediario.findUnique({
                    where: {id: crediario_id},
                    select:{valorTotal: true},
                });

                if (!valorCrediario) {
                    throw new Error("Entrada de cartão não encontrada");
                }

                // Calculando valor crediario + dinheiro
                const trocoCrediario = valorCrediario.valorTotal + valor_recebido;

                let saldoTrocoCrediario = trocoCrediario - valorOrder.valor_pagar;
                if(saldoTrocoCrediario < 0){
                    saldoTrocoCrediario = 0;
                }

                if(forma_pagamento === "CREDIARIO" && trocoCrediario < valorOrder.valor_pagar){
                    throw new Error('Valor invalido');
                }

                const registroCaixa = await prismaClient.registroCaixa.create({
                    data:{
                        order_id: order_id,
                        valor_recebido: trocoCrediario,
                        troco: saldoTrocoCrediario,
                        forma_pagamento: forma_pagamento,
                        plataforma_pagamento: bandera_pagamento,
                        obs: obs,
                        status: true,
                        caixa:{
                            connect:{id: caixa_id}
                        },
                        crediario:{
                            connect:{id: crediario_id}
                        },
                    },
                });
                
                // Incrementando valor de saldo na tabela Caixa
                const valorIncremento = valor_recebido - saldoTrocoCrediario;

                const caixa = await prismaClient.caixa.update({
                    where: {id: caixa_id},
                    data: {
                        saldo:{
                            increment: valorIncremento,
                        },
                    },
                });

                const order = await prismaClient.order.update({
                    where: {id: order_id},
                    data:{status: true}
                });

                // Incrementando a comisão do colaborador
                const comissaoColaborador = (valorOrder.colaborado.complemento_salario / 100) * valorOrder.valor_pagar;
                const colaborador = await prismaClient.colaborador.update({
                    where:{
                        id: valorOrder.colaborado.id,
                    },
                    data:{
                        bonificacao: comissaoColaborador,
                        total_vendas_mes: {
                            increment: valorOrder.valor_pagar,
                        }
                    },
                    select:{
                        id: true,
                        bonificacao: true,
                        usuario:{
                            select: {
                                nome: true,
                            },
                        },
                    },
                });

                // REGISTRANDO A DATA DA ULTIMA COMPRA,
                const cliente = await prismaClient.cliente.update({
                    where: {
                        id: valorOrder.cliente.id,
                    },
                    data: {
                        ultima_compra: new Date(),
                    }
                });

                // Trazendo para criar o comprovante de pagamento do cliente
                const itemsOrder = await prismaClient.order.findFirst({
                    where: {id: order_id},
                    select:{
                        items: true,
                        crediario:{
                            select:{
                                id: true,
                                parcelasCrediario: true,
                                dataVencimento: true,
                            },
                        },
                    },
                });
        
                return { registroCaixa, order, caixa, colaborador, itemsOrder}
            }

        } catch (error) {
            console.log(error);
        }
        
    }
}

export { CreateRegistroCaixaService }