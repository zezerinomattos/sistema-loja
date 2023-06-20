import { Request, Response } from "express";

import { CreateColaboradorService } from '../../services/Colaborador/CreateColaboradorService';

class CreateColaboradorController {
    async handle(req: Request, res: Response){
        const { cpf, nome, nascimento, sexo, email, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, 
            situacao, cargo, celular, telefone, rg, orgao_emissor, carteira_trabalho, serie, pis, titulo_eleitor, zona_eleitoral, secao_eleitoral, salario_base, salario_liquido, complemento_salario, adiantamento_salario, saldo_salario, limite_credito, data_admissao, data_demisao, senha, obs        
        } = req.body;

        const createColaboradorService = new CreateColaboradorService();

        if(!req.file){
            throw new Error('Error upload file');
        }else{
            const { originalname, filename: foto } = req.file;

            const colaborador = await createColaboradorService.execute({ 
                cpf, 
                nome, 
                nascimento, 
                sexo, 
                email, 
                foto, 
                cep, 
                logradouro, 
                numero, 
                complemento, 
                bairro, 
                cidade, 
                uf, 
                pais, 
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
                salario_liquido, 
                complemento_salario, 
                adiantamento_salario, 
                saldo_salario, 
                limite_credito, 
                data_admissao, 
                data_demisao, 
                senha, 
                obs 
            });
            
            return res.json(colaborador);
        }
        
    }
}

export { CreateColaboradorController }
