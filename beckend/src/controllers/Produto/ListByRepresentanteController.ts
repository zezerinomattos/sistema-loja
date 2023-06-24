import { Request, Response } from "express";

import { ListByRepresentanteService } from '../../services/Produto/ListByRepresentanteService';

class ListByRepresentanteController{
    async handle(req: Request, res: Response){
        const representante_id = req.query.representante_id as string;

        const listByRepresentanteService = new ListByRepresentanteService;

        const produtos = await listByRepresentanteService.execute({
            representante_id
        });

        return res.json(produtos);
    }
}

export { ListByRepresentanteController }