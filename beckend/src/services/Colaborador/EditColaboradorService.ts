import prismaClient from "../../prisma";

interface ColaboradorRequest {
    colaborador_id: string;
    nome: string;
    sexo: string;
    email: string;
    foto?: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    pais: string;
    situacao: boolean;
    cargo: string;
    celular: string;
    telefone: string;
    rg: string;
    orgao_emissor: string;
    carteira_trabalho: string;
    serie: string;
    pis: string;
    titulo_eleitor: string
    zona_eleitoral: string
    secao_eleitoral: string;
    salario_base: number;
    complemento_salario: number;
    bonificacao: number;
    quebra_caixa: number;
    saldo_salario: number;
    data_admissao: Date;
    data_demisao: Date;
    obs: string;
}

class EditColaboradorService{
    async execute({ colaborador_id, nome, sexo, email, foto, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, 
        situacao, cargo, celular, telefone, rg, orgao_emissor, carteira_trabalho, serie, pis, titulo_eleitor, zona_eleitoral, secao_eleitoral, salario_base, complemento_salario, bonificacao, quebra_caixa, saldo_salario, data_admissao, data_demisao, obs }: ColaboradorRequest){

         // Verificar se o colaborador existe
        const existingColaborador = await prismaClient.colaborador.findUnique({
            where: { id: colaborador_id },
            include: { usuario: { include: { endereco: true } } },
        });
    
        if (!existingColaborador) {
            throw new Error('Colaborador not found');
        }

        // Atualizar os dados do colaborador
        const updatedColaborador = await prismaClient.colaborador.update({
            where: { id: colaborador_id },
            data: {
            situacao,
            cargo,
            celular,
            telefone,
            rg,
            orgao_emissor,
            carteira_trabalho,
            serie,
            pis,
            titulo_eleitor,
            zona_eleitoral,
            secao_eleitoral,
            salario_base,
            complemento_salario,
            bonificacao,
            quebra_caixa,
            saldo_salario,
            data_admissao,
            data_demisao,
            obs,
            updated_at: new Date(),
            },
        });

        // Atualizar os dados do usuário relacionado
        const updatedUsuario = await prismaClient.usuario.update({
            where: { id: existingColaborador.usuario_id },
            data: {
                nome,
                sexo,
                email,
                foto: foto !== null ? foto : existingColaborador.usuario.foto,
            },
        });
    
        // Atualizar os dados do endereço relacionado
        const updatedendereco = await prismaClient.endereco.update({
            where: { id: existingColaborador.usuario.endereco_id },
            data: {
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            pais,
            },
        });

        return [updatedColaborador, updatedUsuario, updatedendereco];
    }
}

export { EditColaboradorService }