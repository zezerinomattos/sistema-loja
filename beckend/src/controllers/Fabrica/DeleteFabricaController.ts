import { Request, Response } from 'express';

import { DeleteFabricaService } from '../../services/Fabrica/DeleteFabricaService';

class DeleteFabricaController{
    async handle(req: Request, res: Response){
        const fabrica_id = req.query.fabrica_id as string;

        const deleteFabricaService = new DeleteFabricaService;

        const fabrica = await deleteFabricaService.execute({
            fabrica_id
        });

        return res.json(fabrica);
    }
}

export { DeleteFabricaController }