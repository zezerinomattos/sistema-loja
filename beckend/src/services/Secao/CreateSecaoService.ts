import prismaClient from "../../prisma";

interface SecaoRequest{
    nome_secao: string;
}

class CreateSecaoService{
    async execute({ nome_secao }: SecaoRequest){

        if(nome_secao === ''){
            throw new Error('Nome invalido')
        }

        // Verificar se a categoria já existe
        const existingCategoria = await prismaClient.secao.findFirst({
            where: { nome_secao },
        });

        if(existingCategoria){
            throw new Error("Seção já cadastrada");
        }

        const secao = await prismaClient.secao.create({
            data:{
                nome_secao: nome_secao
            },
            select:{
                id: true,
                nome_secao: true
            }
        });

        return secao;
    }
}

export { CreateSecaoService }