import prismaClient from "../../prisma";
import {  parseISO } from 'date-fns';

interface ClienteRequest{
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
    rg?: string; 
    orgao_emissor?: string; 
    celular: string;
    telefone: string
    telefone_referencia1: string; 
    nome_referencia1: string;
    telefone_referencia2: string;
    nome_referencia2: string;
    telefone_referencia3: string;
    nome_referencia3: string;
    score: string;
    profissao: string;
    empresa: string;
    renda_fixa: string;
    complemento_renda?: string;
    limite_credito?: number; 
    obs?: string;
    situacao: boolean;
}

class CreateClienteService {
    async execute({ cpf, nome, nascimento, sexo, email, foto, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, rg, orgao_emissor, celular, telefone, telefone_referencia1, nome_referencia1, telefone_referencia2, nome_referencia2, telefone_referencia3, nome_referencia3, score, limite_credito, situacao, profissao, empresa, renda_fixa, complemento_renda, obs }: ClienteRequest){

        //Verificando se tem cpf digitado
        if(!cpf || cpf.length !== 11){
            throw new Error('Você precisa informar um CPF valido!');
        }
        //Verificando se tem cpf já está cadastrado na plataforma
        const colaboradorAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                cpf: cpf,
                cliente:{
                    some:{
                        situacao: true,
                    }
                }
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

        // Convertendo a string da nascimento em um objeto Date
        const dataNascimento = parseISO(nascimento);

        // Salvando o usuário
        const usuario = await prismaClient.usuario.create({
            data: {
                cpf: cpf,
                nome: nome,
                nascimento: dataNascimento,
                sexo: sexo,
                email: email,
                foto: foto,
                endereco_id:endereco.id,
            },
        });


        // Salvando o cliente
        const cliente = await prismaClient.cliente.create({
            data: {
                rg: rg,
                orgao_emissor:orgao_emissor, 
                celular: celular,
                telefone: telefone,
                telefone_referencia1: telefone_referencia1, 
                nome_referencia1: nome_referencia1,
                telefone_referencia2: telefone_referencia2,
                nome_referencia2: nome_referencia2,
                telefone_referencia3: telefone_referencia3,
                nome_referencia3: nome_referencia3,
                score: score,
                limite_credito: limite_credito, 
                situacao: situacao,
                profissao: profissao,
                empresa: empresa, 
                renda_fixa: renda_fixa, 
                complemento_renda: complemento_renda,
                obs: obs,
                usuario_id: usuario.id,
            },
        });

        return [cliente, usuario, endereco];
        
    }
}

export { CreateClienteService }

