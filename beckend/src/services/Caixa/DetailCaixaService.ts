import prismaClient from "../../prisma";

interface CaixaRequest{
    colaborador_id: string;
}

class DetailCaixaService{
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
            throw new Error('Você não tem um caixa anterior, seu caixa iniciara zerado. Registre uma entrada posteriormente a abertura.');
            return;
        }

        if(caixa.status === true){
            throw new Error('Este colaborador já tem um caixa aberto!');
            return;
        }

        return caixa;
    }
}

export { DetailCaixaService }