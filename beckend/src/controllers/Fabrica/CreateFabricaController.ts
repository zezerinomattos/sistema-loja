import { Request, Response } from 'express';

import { CreateFabricaSevice } from '../../services/Fabrica/CreateFabricaSevice';

class CreateFabricaController{
    async handle(req: Request, res: Response){
        const { empresa, cnpj, ie, razaosocial, contato, representante_id } = req.body;

        const createFabricaSevice = new CreateFabricaSevice;

        const saveEmpresa = empresa.toUpperCase();
        const saveRazaoSocial = razaosocial.toUpperCase();

        const fabrica = await createFabricaSevice.execute({
            empresa: saveEmpresa,
            cnpj,
            ie, 
            razaosocial: saveRazaoSocial,
            contato, 
            representante_id
        });

        return res.json(fabrica);
    }
}

export { CreateFabricaController }; 
