import { Request, Response } from "express";

import { ListRepresentanteBynomeService } from '../../services/Representante/ListRepresentanteBynomeService';

class ListRepresentanteBynomeController{
    async handle(req: Request, res: Response){
        const representante_nome = req.query.representante_nome as string;

        const listRepresentanteBynomeService = new ListRepresentanteBynomeService;

        const representante = await listRepresentanteBynomeService.execute({
            representante_nome
        });

        return res.json(representante);
    }
}

export { ListRepresentanteBynomeController }