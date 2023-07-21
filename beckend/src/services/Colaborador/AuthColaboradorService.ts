import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    senha: string;
}

class AuthColaboradorService {
    async execute({ email, senha }: AuthRequest){
        // Verificando se email existe
        const user = await prismaClient.usuario.findFirst({
            where: {
                email: email
            },
            include: {
                colaborador: true,
                endereco: true
            }
        });
        if(!user){
            throw new Error("User/password incorrect!");
        }

        
        // Verificando senha
        const passwordMatch = await compare(senha, user.colaborador[0].senha);

        if(!passwordMatch){
            throw new Error("User/password incorrect!");
        }

        // Se deu tudo certo a verificacao vamos gerar um um token
        const token = sign(
            {
                name: user.nome,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d' //o token inspira em 30 dias
            }
        )

        return {
            id: user.id,
            nome: user.nome,
            cpf: user.cpf,
            nascimento: user.nascimento,
            sexo: user.sexo,
            email: user.email,
            foto: user.foto,
            cep: user.endereco.cep,
            logradouro: user.endereco.logradouro, 
            numero: user.endereco.numero,
            complemento: user.endereco.complemento, 
            bairro: user.endereco.bairro, 
            cidade: user.endereco.cidade, 
            uf: user.endereco.uf, 
            pais: user.endereco.pais, 
            situacao: user.colaborador[0].situacao, 
            cargo: user.colaborador[0].cargo, 
            celular: user.colaborador[0].celular, 
            telefone: user.colaborador[0].telefone, 
            rg: user.colaborador[0].rg, 
            orgao_emissor: user.colaborador[0].orgao_emissor, 
            carteira_trabalho: user.colaborador[0].carteira_trabalho, 
            serie: user.colaborador[0].serie, 
            pis: user.colaborador[0].pis, 
            titulo_eleitor: user.colaborador[0].titulo_eleitor, 
            zona_eleitoral: user.colaborador[0].zona_eleitoral, 
            secao_eleitoral: user.colaborador[0].secao_eleitoral, 
            salario_base: user.colaborador[0].salario_base, 
            complemento_salario: user.colaborador[0].complemento_salario, 
            quebra_caixa: user.colaborador[0].quebra_caixa, 
            saldo_salario: user.colaborador[0].saldo_salario,  
            data_admissao: user.colaborador[0].data_admissao, 
            data_demisao: user.colaborador[0].data_demisao, 
            obs: user.colaborador[0].obs, 
            created_at: user.created_at,
            updated_at: user.created_at,
            colaborador_id: user.colaborador[0].id,
            token: token,
            url: 'http://localhost:3333/files/',
        };
    }
}

export { AuthColaboradorService }
