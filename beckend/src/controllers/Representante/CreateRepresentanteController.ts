import { Request, Response } from 'express';

import { CreateRepresentanteService } from '../../services/Representante/CreateRepresentanteService';

class CreateRepresentanteController{
    async handle(req: Request, res: Response){
        const { cpf, nome, nascimento, sexo, email, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, empresa, cnpj, razaosocial, celular, telefone, telefone_fabrica} = req.body;

        const createRepresentanteService = new CreateRepresentanteService;

        if(!req.file){
            throw new Error('Error upload file');
        }else{
            const { originalname, filename: foto } = req.file;

            const representante = await createRepresentanteService.execute({
                cpf, 
                nome, 
                nascimento, 
                sexo, 
                foto,
                email, 
                cep, 
                logradouro, 
                numero, 
                complemento, 
                bairro, 
                cidade, 
                uf, 
                pais, 
                empresa, 
                cnpj, 
                razaosocial, 
                celular, 
                telefone, 
                telefone_fabrica,
            });
    
            return res.json(representante);
        }
    }
}

export { CreateRepresentanteController }
