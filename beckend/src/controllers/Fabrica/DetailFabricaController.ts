import { Request, Response } from 'express';

import { DetailFabricaService } from '../../services/Fabrica/DetailFabricaService';

class DetailFabricaController{
    async handle(req: Request, res: Response){

        const fabrica_id = req.query.fabrica_id as string;

        const detailFabricaService = new DetailFabricaService;

        const fabrica = await detailFabricaService.execute({
            fabrica_id
        });

        return res.json(fabrica);
    }
}

export { DetailFabricaController }