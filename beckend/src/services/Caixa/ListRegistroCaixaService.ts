import prismaClient from "../../prisma";

class ListRegistroCaixaService{
    async execute(){
        const resgistroCaixa = await prismaClient.registroCaixa.findMany({
            orderBy: {
                data: 'desc',
            },
        });

        return resgistroCaixa;
    }
}

export { ListRegistroCaixaService }