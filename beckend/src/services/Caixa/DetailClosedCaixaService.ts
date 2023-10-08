import prismaClient from "../../prisma";

interface CaixaRequest{
    colaborador_id: string;
}

class DetailClosedCaixaService{
    async execute({ colaborador_id }: CaixaRequest){
        if(!colaborador_id){
            throw new Error('Colaborador ID inexistente!');
            return;
        }

        const caixa = await prismaClient.caixa.findFirst({
            where: {
                colaborador_id: colaborador_id,
                //status: false,
            },
            orderBy: {
                data_fechamento: 'desc',
            },
        });

        if(!caixa){
            throw new Error('Você não tem um caixa anterior, Abra seu caixa antes de fazer essa operação.');
            return;
        }

        if(caixa.status === false){
            throw new Error('Este caixa está fechado, não pode realizar essa operação!');
            return;
        }

        return caixa;
    }
}

export { DetailClosedCaixaService }