import prismaClient from "../../prisma";

class ListSecaoService{
    async execute(){

        const secao = await prismaClient.secao.findMany({
            select: {
                id: true,
                nome_secao: true
            },
        });
        return secao;
    }
}

export { ListSecaoService }