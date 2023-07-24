import { Request, Response } from 'express';

import { EditClienteService } from '../../services/Cliente/EditClienteService';

class EditClienteController{
    async handle(req: Request, res: Response){
        const { cliente_id ,nome, sexo, email, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, rg, orgao_emissor, celular, telefone, telefone_referencia1, nome_referencia1, telefone_referencia2, nome_referencia2, telefone_referencia3, nome_referencia3, score, limite_credito, situacao, ultima_compra, profissao, empresa, renda_fixa, complemento_renda } = req.body;

        const editClienteService = new EditClienteService;

        if(!req.file){
            throw new Error('Error upload file');
        }else{
            const { originalname, filename: foto } = req.file;

            //--------------------------------------------------------
            // apenas para pode cadastrar um colaborador com Insominia

            const situacao = JSON.parse(req.body.situacao);
            const limite_credito = parseFloat(req.body.limite_credito);

            //--------------------------------------------------------

            const cliente = await editClienteService.execute({ 
                cliente_id,
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
                rg, 
                orgao_emissor, 
                celular, 
                telefone, 
                telefone_referencia1, 
                nome_referencia1, 
                telefone_referencia2, 
                nome_referencia2, 
                telefone_referencia3, 
                nome_referencia3, 
                score, 
                limite_credito, 
                situacao, 
                ultima_compra,
                profissao, 
                empresa, 
                renda_fixa, 
                complemento_renda
             });

            return res.json(cliente);
        }
    }
}

export { EditClienteController }
