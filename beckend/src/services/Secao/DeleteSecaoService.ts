import prismaClient from "../../prisma";

interface SecaoRequest{
    secao_id: string;
}

class DeleteSecaoService{
    async execute({ secao_id }: SecaoRequest){

        const secao = await prismaClient.secao.delete({
            where: {
                id: secao_id
            }
        });

        return secao;
    }
}

export { DeleteSecaoService }