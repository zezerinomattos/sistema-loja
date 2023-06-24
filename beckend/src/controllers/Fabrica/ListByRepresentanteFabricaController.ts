import { Request, Response } from "express";

import { ListByRepresentanteFabricaService } from '../../services/Fabrica/ListByRepresentanteFabricaService';

class ListByRepresentanteFabricaController{
    async handle(req: Request, res: Response){
        const representante_id = req.query.representante_id as string;

        const listByRepresentanteService = new ListByRepresentanteFabricaService;

        const produtos = await listByRepresentanteService.execute({
            representante_id
        });

        return res.json(produtos);
    }
}

export { ListByRepresentanteFabricaController }