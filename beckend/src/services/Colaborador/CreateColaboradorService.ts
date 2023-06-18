import prismaClient from "../../prisma";

interface ColaboradorRequest {
    cpf: string;
    nome: string;
    nascimento: string;
    sexo: string;
    email: string;
    foto: string;
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
    salario_liquido: number;
    complemento_salario: number;
    adiantamento_salario: number;
    saldo_salario: number;
    limite_credito: number;
    data_admissao: Date;
    data_demisao: Date;
    senha: string;
    obs: string;
}

class CreateColaboradorService {
    async execute({ cpf, nome, nascimento, sexo, email, foto, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, 
        situacao, cargo, celular, telefone, rg, orgao_emissor, carteira_trabalho, serie, pis, titulo_eleitor, zona_eleitoral, secao_eleitoral, salario_base, salario_liquido, complemento_salario, adiantamento_salario, saldo_salario, limite_credito, data_admissao, data_demisao, senha, obs }: ColaboradorRequest){

        //Verificando se tem cpf digitado
        if(!cpf || cpf.length !== 11){
            throw new Error('Você precisa informar um CPF valido!');
        }
        //Verificando se tem cpf já está cadastrado na plataforma
        const colaboradorAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                cpf: cpf
            }
        });
        if(colaboradorAlreadyExists){
            throw new Error('Esse CPF já existe em nosso Banco de dados!');
        }

        // Salvando o endereço
        const endereco = await prismaClient.endereco.create({
            data:{
                cep: cep,
                logradouro: logradouro,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                pais: pais,
            },
        });

        // Salvando o usuário
        const usuario = await prismaClient.usuario.create({
            data:{
                cpf: cpf,
                nome: nome,
                nascimento: nascimento,
                sexo: sexo,
                email: email,
                foto: foto,
                endereco_id:endereco.id,
            },
        });

        // Salvando o funcionário
        const colaborador = await prismaClient.colaborador.create({
            data:{
                situacao: situacao,
                cargo: cargo,
                celular: celular,
                telefone: telefone,
                rg: rg,
                orgao_emissor: orgao_emissor,
                carteira_trabalho: carteira_trabalho,
                serie: serie,
                pis: pis,
                titulo_eleitor: titulo_eleitor,
                zona_eleitoral: zona_eleitoral,
                secao_eleitoral: secao_eleitoral,
                salario_base: salario_base,
                salario_liquido: salario_liquido,
                complemento_salario: complemento_salario,
                adiantamento_salario: adiantamento_salario,
                saldo_salario: saldo_salario,
                limite_credito: limite_credito,
                data_admissao: data_admissao,
                data_demisao: data_demisao,
                senha: senha,
                obs: obs,
                usuario_id: usuario.id,
            },
        });
        
        return { ok: true };
    }
}

export { CreateColaboradorService }