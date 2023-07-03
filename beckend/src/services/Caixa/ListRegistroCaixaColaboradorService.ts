import prismaClient from "../../prisma";

interface RegistroCaixa{
    colaborador_id: string;
}

class ListRegistroCaixaColaboradorService{
    async execute({ colaborador_id }: RegistroCaixa){
        const registroCaixa = await prismaClient.registroCaixa.findMany({
            where: {
                caixa: {
                    colaborador_id: colaborador_id,
                },
            },
            orderBy:{
                data: 'desc',
            },
        });

        return registroCaixa;
    }
}

export { ListRegistroCaixaColaboradorService }