import prismaClient from "../../prisma";

interface RegistroCaixaRequest{
    registro_caixa_id: string;
}

class CancelarRegistroCaixaService{
    async execute({ registro_caixa_id }: RegistroCaixaRequest){
        const registroCaixa = await prismaClient.registroCaixa.findUnique({
            where: {id: registro_caixa_id},
            include: {
                entradacartao: true,
                caixa:{
                    select: {
                        saldo: true
                    }
                }
            },
        });

        //Retirando o valor do registro para o saldo de caixa
        const valorSaldo = registroCaixa.valor_recebido - registroCaixa.troco;

        const caixa = await prismaClient.caixa.update({
            where: {id: registroCaixa.caixa_id},
            data:{
                saldo: {
                    decrement: valorSaldo,
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