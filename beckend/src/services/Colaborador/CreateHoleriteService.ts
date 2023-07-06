import prismaClient from "../../prisma";

interface HoleriteRequest{
    colaborador_id: string;
    mes: Date;
    descontos?: number; // Descontos de compras internas
    meta_venda?: number // Meta que o vendedor tem que atingir para ganhar bonificação
    bonificacao_meta?: number; //Vendedor atingiu a meta de venda ganha 
}

class CreateHoleriteService{
    async execute({ colaborador_id, mes, descontos, meta_venda, bonificacao_meta }: HoleriteRequest){
        const colaborador = await prismaClient.colaborador.findFirst({
            where: {
                id: colaborador_id,
            },
            select:{
                id: true,
                usuario: {
                    select:{
                        nome: true,
                        email: true,
                        cpf: true,
                    },
                },
                celular: true,
                cargo: true,
                situacao: true,
                salario_base: true,
                quebra_caixa: true,
                bonificacao: true,
                total_vendas_mes: true,
                data_admissao: true,
            },
        });

        if(!colaborador?.situacao){
            throw new Error('Colaborador não trabalha mais na empresa');
        }

        let salario_liquido = (colaborador?.salario_base + colaborador?.bonificacao) - descontos;

        // Se ele for caixa o bonus dele é o quebra caixa
        if(colaborador?.cargo === 'CAIXA'){
            salario_liquido = ((colaborador?.salario_base + colaborador?.quebra_caixa) - colaborador?.bonificacao) - descontos;
        }

        if(colaborador?.cargo === 'VENDEDOR' && colaborador.total_vendas_mes >= meta_venda){
            salario_liquido = ((colaborador?.salario_base + colaborador?.bonificacao) + bonificacao_meta) - descontos
        }

        const holerite = await prismaClient.holerite.create({
            data:{
                situacao: colaborador?.situacao,
                colaborador: { connect: { id: colaborador_id } },
                colaborador_nome: colaborador?.usuario.nome,
                cpf: colaborador?.usuario.cpf,
                email: colaborador?.usuario.email,
                celular: colaborador?.celular,
                mes: mes,
                salario: colaborador?.salario_base,
                descontos: descontos,
                bonus: colaborador?.bonificacao,
                quebra_caixa: colaborador?.quebra_caixa,
                liquido: salario_liquido,
            }
        });

        const updateColborador = await prismaClient.colaborador.update({
            where:{
                id: colaborador_id,
            },
            data:{
                bonificacao: 0,
                total_vendas_mes: 0,
            },
        });

        return holerite;
    }
}

export { CreateHoleriteService }