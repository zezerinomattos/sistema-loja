import prismaClient from "../../prisma"

class DetailUserService{
    async execute(user_id: string){
        
        const user = await prismaClient.usuario.findFirst({
            where: {
                id: user_id
            },
            include: {
                colaborador: {
                    select:{
                        id: true,
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
                        total_vendas_mes: true,
                        quebra_caixa: true,
                        saldo_salario: true,
                        data_admissao: true,
                        data_demisao: true,
                        obs: true
                    }
                },
                endereco: true
            }
        });
        return user;
    }
}

export { DetailUserService }