import prismaClient  from "../../prisma";

interface RegistroCaixaRequest{
    colaborador_id: string;
    data_inicial: Date;
    data_final: Date;
}

// LISTANDO COLABORADOR PELO ID E POR UM PERÍODO DE TEMPO
class ListRegistroCaixaColaboradorDateService{
    async execute({ colaborador_id, data_inicial, data_final }: RegistroCaixaRequest){

        if(!colaborador_id){
            throw new Error('Informe o ID do Colaborador');
        }

        const registroCaixa = await prismaClient.registroCaixa.findMany({
            where: {
                caixa:{
                    colaborador:{
                        id: colaborador_id,
                    },
                },
                data: {
                    gte: data_inicial,
                    lte: data_final,
                },
            },
            orderBy: {
               data: 'desc',
            },
        });

        return registroCaixa;
    }
}

export { ListRegistroCaixaColaboradorDateService }