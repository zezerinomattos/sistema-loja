import prismaClient from "../../prisma";
import { parseISO } from 'date-fns';

interface RepresentanteRequest{
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
    empresa: string; 
    cnpj: string; 
    razaosocial: string; 
    celular: string; 
    telefone: string; 
    telefone_fabrica: string;
}

class CreateRepresentanteService{
    async execute({ cpf, nome, nascimento, sexo, email, foto, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, empresa, cnpj, razaosocial, celular, telefone, telefone_fabrica }: RepresentanteRequest){

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

        // Salvando o representante
        const representante = await prismaClient.representante.create({
            data:{
                empresa: empresa,
                cnpj: cnpj, 
                razaosocial: razaosocial, 
                celular: celular, 
                telefone: telefone, 
                telefone_fabrica: telefone_fabrica,
                usuario_id: usuario.id,
            }
        });

        return [representante, usuario, endereco];
    }
}

export { CreateRepresentanteService }