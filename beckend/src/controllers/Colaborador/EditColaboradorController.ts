import { Request, Response } from 'express';

import { EditColaboradorService } from '../../services/Colaborador/EditColaboradorService';

class EditColaboradorController{
    async handle(req: Request, res: Response){
        const {colaborador_id ,nome, sexo, email, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, 
            situacao, cargo, celular, telefone, rg, orgao_emissor, carteira_trabalho, serie, pis, titulo_eleitor, zona_eleitoral, secao_eleitoral, salario_base, complemento_salario, quebra_caixa, bonificacao, saldo_salario, data_admissao, data_demisao, obs } = req.body;
        
        const editColaboradorService = new EditColaboradorService;
        
        if(req.file){
            const { originalname, filename: foto } = req.file;

            //--------------------------------------------------------
            // apenas para pode cadastrar um colaborador com Insominia

            const situacao = JSON.parse(req.body.situacao);
            const salario_base = parseFloat(req.body.salario_base.replace(',', '.'));         
            const complemento_salario = parseInt(req.body.complemento_salario);
            const name = nome.toUpperCase();
            const saveEmail = email.toLowerCase();
            const saveObs = obs.toUpperCase()
            const quebra_caixa = parseFloat(req.body.quebra_caixa.replace(',', '.'));  

            //--------------------------------------------------------

            const colaborador = await editColaboradorService.execute({
                colaborador_id, 
                nome: name,  
                sexo, 
                email: saveEmail, 
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
                complemento_salario, 
                bonificacao,
                quebra_caixa, 
                saldo_salario, 
                data_admissao, 
                data_demisao, 
                obs: saveObs
            });

            return res.json(colaborador);
            
        }else{

            //--------------------------------------------------------
            // apenas para pode cadastrar um colaborador com Insominia

            const situacao = JSON.parse(req.body.situacao);
            const salario_base = parseFloat(req.body.salario_base.replace(',', '.'));         
            const complemento_salario = parseInt(req.body.complemento_salario);
            const name = nome.toUpperCase();
            const saveEmail = email.toLowerCase();
            const saveObs = obs.toUpperCase()
            const quebra_caixa = parseFloat(req.body.quebra_caixa.replace(',', '.')); 
            const foto = null; 

            //--------------------------------------------------------

            const colaborador = await editColaboradorService.execute({
                colaborador_id, 
                nome: name,  
                sexo, 
                email: saveEmail, 
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
                complemento_salario, 
                bonificacao,
                quebra_caixa, 
                saldo_salario, 
                data_admissao, 
                data_demisao, 
                obs: saveObs
            });

            return res.json(colaborador);
        }
    }
}

export { EditColaboradorController };