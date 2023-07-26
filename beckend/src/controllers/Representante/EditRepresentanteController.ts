import { Request, Response } from 'express';

import { EditRepresentanteService } from '../../services/Representante/EditRepresentanteService';

class EditRepresentanteController{
    async handle(req: Request, res: Response){
        const { representante_id, nome, sexo, email, cep, logradouro, numero, complemento, bairro, cidade, uf, pais, empresa, celular, telefone } = req.body;

        const editRepresentanteService = new EditRepresentanteService;

        if(req.file){
            const { originalname, filename: foto } = req.file;

            const representante = await editRepresentanteService.execute({
                representante_id, 
                nome, 
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
                celular, 
                telefone, 
            });
    
            return res.json(representante);
        }else{
            const foto = null; 

            const representante = await editRepresentanteService.execute({
                representante_id, 
                nome, 
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
                celular, 
                telefone, 
            });
    
            return res.json(representante);
        }
    }
}

export { EditRepresentanteController }