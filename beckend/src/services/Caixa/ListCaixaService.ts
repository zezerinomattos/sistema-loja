import prismaClient from "../../prisma";

class ListCaixaService{
    async execute(){
        const caixa = await prismaClient.caixa.findMany({
            where: {
                status: true,
            },
            select:{
                id: true,
                status: true,
                colaborador:{
                    select: {
                        id: true,
                        usuario:{
                            select:{
                                nome: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                data_abertura: 'desc'
            },
        });

        return caixa;
    }
}

export { ListCaixaService }
