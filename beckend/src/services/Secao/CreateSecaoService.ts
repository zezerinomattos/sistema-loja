import prismaClient from "../../prisma";

interface SecaoRequest{
    nome_secao: string;
}

class CreateSecaoService{
    async execute({ nome_secao }: SecaoRequest){

        const secao = await prismaClient.secao.create({
            data:{
                nome_secao: nome_secao
            }
        });

        return secao;
    }
}

export { CreateSecaoService }