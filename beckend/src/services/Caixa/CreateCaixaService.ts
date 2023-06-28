import prismaClient from "../../prisma";

interface CaixaRequest{
    valor_inicial: number,
    obs: string,
    colaborador_id: string
}

class CreateCaixaService{
    async execute({ valor_inicial, obs, colaborador_id }: CaixaRequest){

        const caixa = await prismaClient.caixa.create({
            data: {
                valor_inicial: valor_inicial,
                obs: obs,
                colaborador_id: colaborador_id
            },
        });

        return caixa;
    }
}

export { CreateCaixaService }