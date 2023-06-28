import prismaClient from "../../prisma";

class ListSecaoService{
    async execute(){

        const secao = await prismaClient.secao.findMany({
            select: {
                id: true,
                nome_secao: true
            },
            orderBy:{
                nome_secao: "asc"
            }
        });
        return secao;
    }
}

export { ListSecaoService }