import prismaClient from "../../prisma"

interface ColaboradorRequest{
    colaborador_id: string;
}

class DetailColaboradorService{
    async execute({ colaborador_id }: ColaboradorRequest){

        const colaborador = await prismaClient.usuario.findMany({
            where: {
                id: colaborador_id
            },
            include: {
                colaborador: {
                    select:{
                        situacao: true,
                        cargo: true,
                        celular: true,
                        telefone: true,
                        rg: true,
                        orgao_emissor: true,
                        carteira_trabalho: true,
                        serie: true,
                        pis: true,
                        titulo_eleitor: true,
                        zona_eleitoral: true,
                        secao_eleitoral: true,
                        salario_base: true,
                        complemento_salario: true,
                        bonificacao: true,
                        quebra_caixa: true,
                        saldo_salario: true,
                        limite_credito: true,
                        data_admissao: true,
                        data_demisao: true,
                        obs: true
                    }
                },
                endereco: true
            }
        });

        if(!colaborador[0].colaborador[0]){
            throw new Error('ID do colaborador inválido');
        }

        return colaborador;
    }
}

export { DetailColaboradorService }