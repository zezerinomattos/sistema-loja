import prismaClient  from "../../prisma";

interface RegistroCaixaRequest{
    nome_colaborador: string;
}

class ListRegistroCaixaColaboradorNomeService{
    async execute({ nome_colaborador }: RegistroCaixaRequest){
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
            },
            orderBy: {
                caixa:{
                    colaborador:{
                        usuario: {
                            nome: "asc", // Ordenar em ordem crescente pelo nome do caixa
                          },
                    },
                },
            },
        });

        return registroCaixa;
    }
}

export { ListRegistroCaixaColaboradorNomeService }