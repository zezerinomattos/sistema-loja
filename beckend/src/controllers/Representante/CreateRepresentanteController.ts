import { Request, Response } from 'express';

import { CreateRepresentanteService } from '../../services/Representante/CreateRepresentanteService';

class CreateRepresentanteController{
    async handle(req: Request, res: Response){
        const { cpf, nome, nascimento, sexo, email, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, empresa, celular, telefone, obs} = req.body;

        const createRepresentanteService = new CreateRepresentanteService;

        if(!req.file){
            throw new Error('Error upload file');
        }else{
            const { originalname, filename: foto } = req.file;

            const name = nome.toUpperCase();
            const saveEmail = email.toLowerCase();
            const saveObs = obs.toUpperCase()
            const savePais = pais.toUpperCase();
            const saveEmpresa = empresa.toUpperCase();

            const representante = await createRepresentanteService.execute({
                cpf, 
                nome: name, 
                nascimento, 
                sexo, 
                foto,
                email: saveEmail, 
                cep, 
                logradouro, 
                numero, 
                complemento, 
                bairro, 
                cidade, 
                uf, 
                pais: savePais, 
                empresa: saveEmpresa, 
                celular, 
                telefone, 
                obs: obs,
            });
    
            return res.json(representante);
        }
    }
}

export { CreateRepresentanteController }
