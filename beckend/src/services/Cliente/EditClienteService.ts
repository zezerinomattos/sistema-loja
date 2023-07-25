import prismaClient from "../../prisma";
import {  parseISO } from 'date-fns';

interface ClienteRequest{
    cliente_id: string;
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
    rg: string; 
    orgao_emissor: string; 
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
    limite_credito: number; 
    obs: string;
}

class EditClienteService{
    async execute({ cliente_id, nome, sexo, email, foto, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, rg, orgao_emissor, celular, telefone, telefone_referencia1, nome_referencia1, telefone_referencia2, nome_referencia2, telefone_referencia3, nome_referencia3, score, limite_credito, profissao, empresa, renda_fixa, complemento_renda, obs }: ClienteRequest){

        // Verificar se o colaborador existe
        const existingCliente = await prismaClient.cliente.findUnique({
            where: { id: cliente_id },
            include: { usuario: { include: { endereco: true } } },
        });

        if(!existingCliente){
            throw new Error('Cliente not found');
        }

        // Convertendo a string da última atualizacao em um objeto Date
        //const dataUltimaUpdate = parseISO(updated_at);

        //Atualizar os dados do cliente
        const updateCliente = await prismaClient.cliente.update({
            where: { id: cliente_id},
            data:{
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
                profissao: profissao,
                empresa: empresa, 
                renda_fixa: renda_fixa, 
                complemento_renda: complemento_renda,
                limite_credito: limite_credito, 
                updated_at: new Date(),
                obs: obs,
            },
        });

        // Atualizar os dados do usuário relacionado
        const updatedUsuario = await prismaClient.usuario.update({
            where: { id: existingCliente.usuario_id },
            data:{
                nome,
                sexo,
                email,
                foto: foto !== null ? foto : existingCliente.usuario.foto,
            },
        });

        // Atualizar os dados do endereço relacionado
        const updatedEndereco = await prismaClient.endereco.update({
            where: {id: existingCliente.usuario.endereco_id},
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

        return [updateCliente, updatedUsuario, updatedEndereco];
    }
}

export { EditClienteService }