import { Request, Response } from 'express';

import { CreateClienteService } from  '../../services/Cliente/CreateClienteService';

class CreateClienteController{
    async handle(req: Request, res: Response){
        const {  cpf, nome, nascimento, sexo, email, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, rg, orgao_emissor, celular, telefone, telefone_referencia1, nome_referencia1, telefone_referencia2, nome_referencia2, telefone_referencia3, nome_referencia3, score, limite_credito, situacao, ultima_compra } = req.body;
        
        const createClienteService = new CreateClienteService;

        if(!req.file){
            throw new Error('Error upload file');
        }else{
            const { originalname, filename: foto } = req.file;

            //--------------------------------------------------------
            // apenas para pode cadastrar um colaborador com Insominia

            // const situacao = JSON.parse(req.body.situacao);
            // const limite_credito = parseFloat(req.body.limite_credito);

            //--------------------------------------------------------

            const cliente = await createClienteService.execute({
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
                ultima_compra
            });
    
            return res.json(cliente);
        }       
    }
}

export { CreateClienteController }

