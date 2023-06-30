import prismaClient from "../../prisma";

interface RegistroCaixaRequest{
    registro_caixa_id: string;
}

class CancelarRegistroCaixaService{
    async execute({ registro_caixa_id }: RegistroCaixaRequest){
        const registroCaixa = await prismaClient.registroCaixa.findUnique({
            where: {id: registro_caixa_id},
            include: {
                entradacartao: true
            },
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

        return registroCaixaCancelar;
    }
}

export { CancelarRegistroCaixaService }