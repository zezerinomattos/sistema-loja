import { Request, Response } from 'express';

import { EditClienteService } from '../../services/Cliente/EditClienteService';

class EditClienteController{
    async handle(req: Request, res: Response){
        const { cliente_id ,nome, sexo, email, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, rg, orgao_emissor, celular, telefone, telefone_referencia1, nome_referencia1, telefone_referencia2, nome_referencia2, telefone_referencia3, nome_referencia3, score, ultima_compra, profissao, empresa, renda_fixa, complemento_renda, obs } = req.body;

        const editClienteService = new EditClienteService;

        if(req.file){
            
            const { originalname, filename: foto } = req.file;

            //--------------------------------------------------------
            // apenas para pode cadastrar um colaborador com Insominia

            //const situacao = JSON.parse(req.body.situacao);
            const limite_credito = parseFloat(req.body.limite_credito);

            const name = nome.toUpperCase();
            const saveEmail = email.toLowerCase();
            const saveObs = obs.toUpperCase()
            const savePais = pais.toUpperCase();
            const referencia1 = nome_referencia1.toUpperCase();
            const referencia2 = nome_referencia2.toUpperCase();
            const referencia3 = nome_referencia3.toUpperCase();

            //--------------------------------------------------------

            const cliente = await editClienteService.execute({ 
                cliente_id,
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
                pais: savePais, 
                rg, 
                orgao_emissor, 
                celular, 
                telefone, 
                telefone_referencia1, 
                nome_referencia1: referencia1, 
                telefone_referencia2, 
                nome_referencia2: referencia2, 
                telefone_referencia3, 
                nome_referencia3: referencia3, 
                score, 
                limite_credito, 
                profissao, 
                empresa, 
                renda_fixa, 
                complemento_renda,
                obs: saveObs,
             });

            return res.json(cliente);

        }else{

            //--------------------------------------------------------
            // apenas para pode cadastrar um colaborador com Insominia

            //const situacao = JSON.parse(req.body.situacao);
            const limite_credito = parseFloat(req.body.limite_credito);
            const foto = null; 

            const name = nome.toUpperCase();
            const saveEmail = email.toLowerCase();
            const saveObs = obs.toUpperCase()
            const savePais = pais.toUpperCase();
            const referencia1 = nome_referencia1.toUpperCase();
            const referencia2 = nome_referencia2.toUpperCase();
            const referencia3 = nome_referencia3.toUpperCase();
            //--------------------------------------------------------

            const cliente = await editClienteService.execute({ 
                cliente_id,
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
                pais: savePais, 
                rg, 
                orgao_emissor, 
                celular, 
                telefone, 
                telefone_referencia1, 
                nome_referencia1: referencia1, 
                telefone_referencia2, 
                nome_referencia2: referencia2, 
                telefone_referencia3, 
                nome_referencia3: referencia3, 
                score, 
                limite_credito, 
                profissao, 
                empresa, 
                renda_fixa, 
                complemento_renda,
                obs: saveObs,
            });

            return res.json(cliente);
        }
    }
}

export { EditClienteController }
