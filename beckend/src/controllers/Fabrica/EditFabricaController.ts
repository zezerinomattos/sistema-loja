import { Request, Response } from 'express';

import { EditFabricaSevice } from '../../services/Fabrica/EditFabricaSevice';

class EditFabricaController{
    async handle(req: Request, res: Response){
        const { fabrica_id, empresa, ie, razaosocial, contato, representante_id  } = req.body;

        const editFabricaSevice = new EditFabricaSevice;

        const fabrica = await editFabricaSevice.execute({
            fabrica_id, 
            empresa, 
            ie, 
            razaosocial, 
            contato, 
            representante_id 
        });

        return res.json(fabrica)
    }
}

export { EditFabricaController }