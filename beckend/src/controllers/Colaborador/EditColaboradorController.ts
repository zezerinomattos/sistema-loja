import { Request, Response } from 'express';

import { EditColaboradorService } from '../../services/Colaborador/EditColaboradorService';

class EditColaboradorController{
    async handle(req: Request, res: Response){
        const {colaborador_id ,nome, sexo, email, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, 
            situacao, cargo, celular, telefone, rg, orgao_emissor, carteira_trabalho, serie, pis, titulo_eleitor, zona_eleitoral, secao_eleitoral, salario_base, salario_liquido, complemento_salario, adiantamento_salario, bonificacao, saldo_salario, limite_credito, data_admissao, data_demisao, obs } = req.body;
        
        const editColaboradorService = new EditColaboradorService;
        
        if(!req.file){
            throw new Error('Error upload file');
        }else{
            const { originalname, filename: foto } = req.file;

            //--------------------------------------------------------
            // apenas para pode cadastrar um colaborador com Insominia
            
            // const situacao = JSON.parse(req.body.situacao);
            // const salario_base = parseFloat(req.body.salario_base);
            // const salario_liquido = parseFloat(req.body.salario_liquido);
            // const complemento_salario = parseInt(req.body.complemento_salario);
            // const adiantamento_salario = parseInt(req.body.adiantamento_salario);
            // const saldo_salario = parseFloat(req.body.saldo_salario);
            // const limite_credito = parseFloat(req.body.limite_credito);

            //--------------------------------------------------------

            const colaborador = await editColaboradorService.execute({
                colaborador_id, 
                nome,  
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
                bonificacao,
                adiantamento_salario, 
                saldo_salario, 
                limite_credito, 
                data_admissao, 
                data_demisao, 
                obs 
            });

            return res.json(colaborador);
        }
    }
}

export { EditColaboradorController };