import prismaClient from "../../prisma";

interface RegistroCaixaRequest{
    order_id: string;
    valor_recebido: number;
    forma_pagamento: string;
    bandera_pagamento?: string;
    obs?: string;
    caixa_id: string;
    entradacartao_id?: string;
}

class CreateRegistroCaixaService{
    async execute({ order_id, valor_recebido, forma_pagamento, bandera_pagamento, obs, caixa_id, entradacartao_id }: RegistroCaixaRequest){

        const valorOrder = await prismaClient.order.findUnique({
            where: {
                id: order_id
            },
            select:{
                id: true,
                valor_pagar: true,
                status: true,
            },
        });

        if(!valorOrder.id){
            throw new Error('Order não encontrada');
        }

        if(valorOrder.status){
            throw new Error('Order já finalizada');
        }

        if(valor_recebido - valorOrder.valor_pagar){
            throw new Error('Valor invalido');
        }

        // Calculando o troco
        let saldoTroco = valor_recebido - valorOrder.valor_pagar;
        if(saldoTroco < 0){
            saldoTroco = 0;
        }

        // Criando registro de caixa e verificando se é dinheiro ou cheque.
        if(forma_pagamento === "DINHEIRO" || forma_pagamento === "CHEQUE"){

            const registroCaixa = await prismaClient.registroCaixa.create({
                data:{
                    order_id: order_id,
                    valor_recebido: valor_recebido,
                    troco: saldoTroco,
                    forma_pagamento: forma_pagamento,
                    bandera_pagamento: bandera_pagamento,
                    obs: obs,
                    caixa:{
                        connect:{id: caixa_id}
                    },
                },
            });

            const order = await prismaClient.order.update({
                where: {id: order_id},
                data:{status: true}
            });

            return { registroCaixa, order}

        }else{
            const registroCaixa = await prismaClient.registroCaixa.create({
                data:{
                    order_id: order_id,
                    valor_recebido: valor_recebido,
                    troco: saldoTroco,
                    forma_pagamento: forma_pagamento,
                    bandera_pagamento: bandera_pagamento,
                    obs: obs,
                    caixa:{
                        connect:{id: caixa_id}
                    },
                    entradacartao:{
                        connect:{id: entradacartao_id}
                    },
                },
            });

            const order = await prismaClient.order.update({
                where: {id: order_id},
                data:{status: true}
            });
    
            return { registroCaixa, order}
        }
        
    }
}

export { CreateRegistroCaixaService }