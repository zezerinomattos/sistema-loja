import { Request, Response } from "express";

import { ListByNomeFabricaService } from '../../services/Fabrica/ListByNomeFabricaService';

class ListByNomeFabricaController{
    async handle(req: Request, res: Response){
        const fabrica_id = req.query.fabrica_id as string;

        const listByNomeFabricaService = new ListByNomeFabricaService;

        const fabrica = await listByNomeFabricaService.execute({
            fabrica_id
        });

        return res.json(fabrica)
    }
}

export { ListByNomeFabricaController }