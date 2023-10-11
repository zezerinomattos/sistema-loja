import prismaClient from "../../prisma";

class ListQuebraCaixaService{
    async execute(){
        const quebraCaixa = await prismaClient.quebraCaixa.findMany({
            where: {
                status: true,
            },
            include: {
                caixa: {
                    select:{
                        colaborador: {
                            select: {
                                usuario: {
                                    select: {
                                        nome: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                data: 'desc'
            },
        });

        return { quebraCaixa }
    }
}

export { ListQuebraCaixaService }