import { Request, Response } from 'express';

import { ListFabricaService } from '../../services/Fabrica/ListFabricaService';

class ListFabricaController{
    async handle(req: Request, res: Response){

        const listFabricaService = new ListFabricaService;

        const fabrica = await listFabricaService.execute();

        return res.json(fabrica);
    }
}

export { ListFabricaController };