import prismaClient from "../../prisma";

interface RegistroCaixaRequest{
    registro_caixa_id: string;
}

class CancelarRegistroCaixaService{
    async execute({ registro_caixa_id }: RegistroCaixaRequest){

        if(!registro_caixa_id){
            throw new Error('Informe um ID de Registro de caixa');
        }

        const registroCaixa = await prismaClient.registroCaixa.findUnique({
            where: {id: registro_caixa_id},
            include: {
                entradacartao: true,
                caixa:{
                    select: {
                        saldo: true
                    }
                },
            },
        });

        if(!registroCaixa){
            throw new Error('Registro de caixa não encontrado');
        }

        // Retirando o valor do registro para o saldo de caixa
        let valorSaldoDecremento = 0;

        if (registroCaixa.forma_pagamento === 'CARTÃO') {
            const valorSaldoCartao = registroCaixa.valor_recebido - (registroCaixa.entradacartao?.valor_entrada ?? 0) - registroCaixa.troco;

            valorSaldoDecremento = valorSaldoCartao;

        } else {
            valorSaldoDecremento = registroCaixa.valor_recebido - registroCaixa.troco;
        }

        const caixa = await prismaClient.caixa.update({
            where: {id: registroCaixa.caixa_id},
            data:{
                saldo: {
                    decrement: valorSaldoDecremento,
                }
            }
        });

        const registroCaixaCancelar = await prismaClient.registroCaixa.update({
            where: {id: registro_caixa_id},
            data:{
                status: false,  //Falando que está sendo cancelado
            },
        });


        if (registroCaixa.entradacartao) {
            await prismaClient.entradaCartao.delete({
                where: {
                    id: registroCaixa.entradacartao.id,
                },
            });
        }

        return {registroCaixaCancelar, caixa};
    }
}

export { CancelarRegistroCaixaService }
