import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';
import {  parseISO } from 'date-fns';

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
    complemento_salario: number;
    bonificacao: number;
    quebra_caixa: number;
    saldo_salario: number;
    data_admissao: Date;
    data_demisao: Date;
    senha: string;
    obs: string;
    colaborador_id?:string;
    colaborador_cargo?: string;
}

class CreateColaboradorService {
    async execute({ cpf, nome, nascimento, sexo, email, foto, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, 
        situacao, cargo, celular, telefone, rg, orgao_emissor, carteira_trabalho, serie, pis, titulo_eleitor, zona_eleitoral, secao_eleitoral, salario_base, complemento_salario, bonificacao, quebra_caixa, saldo_salario, data_admissao, data_demisao, senha, obs, colaborador_id, colaborador_cargo }: ColaboradorRequest){

        //Verificando se tem cpf digitado
        if(!cpf || cpf.length !== 11){
            throw new Error('Você precisa informar um CPF valido!');
        }
        //Verificando se tem cpf já está cadastrado na plataforma
        const colaboradorAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                cpf: cpf,
                colaborador:{
                    some: {
                        situacao: true,
                    }
                }
            }
        });
        if(colaboradorAlreadyExists){
            throw new Error('Esse CPF já existe em nosso Banco de dados!');
        }

        // Verificando se o email já está cadastrado na plataforma
        const emailAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                email: email,
            },
        });

        // Verificando se é um gerente ou administrador para poder criar um colaborador
        if(colaborador_cargo !== 'GERENTE' && colaborador_cargo !== 'ADMIM') {
            throw new Error('Você não tem permissão para criar um colaborador!');
        }
    
        if (emailAlreadyExists) {
            throw new Error('Esse email já está cadastrado em nosso Banco de dados!');
        }

        // Criptografando a senha
        const passwordHash = await hash(senha, 8);

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

        // Convertendo a string da nascimento em um objeto Date
        const dataNascimento = parseISO(nascimento);

        // Salvando o usuário
        const usuario = await prismaClient.usuario.create({
            data:{
                cpf: cpf,
                nome: nome,
                nascimento: dataNascimento,
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
                complemento_salario: complemento_salario,
                bonificacao: bonificacao,
                quebra_caixa: quebra_caixa,
                saldo_salario: saldo_salario,
                data_admissao: data_admissao,
                data_demisao: data_demisao,
                senha: passwordHash,
                obs: obs,
                usuario_id: usuario.id,
                colaborador_id: colaborador_id,
            },
        });
        
        return [colaborador, usuario, endereco];
    }
}

export { CreateColaboradorService }
