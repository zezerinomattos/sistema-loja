import prismaClient  from "../../prisma";

interface RegistroCaixaRequest{
    nome_colaborador: string;
    data_inicial: Date;
    data_final: Date;
}

class ListRegistroCaixaColaboradorNomeDateService{
    async execute({ nome_colaborador, data_inicial, data_final }: RegistroCaixaRequest){

        if(!nome_colaborador){
            throw new Error('Informe o nome do colaborador');
        }

        const registroCaixa = await prismaClient.registroCaixa.findMany({
            where: {
                caixa:{
                    colaborador:{
                        usuario:{
                            nome: {
                                contains: nome_colaborador,
                            }
                        },
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

export { ListRegistroCaixaColaboradorNomeDateService }