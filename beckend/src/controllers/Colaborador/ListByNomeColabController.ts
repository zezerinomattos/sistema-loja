import { Request, Response } from "express";

import { ListByNomeColabService } from '../../services/Colaborador/ListByNomeColabService';

class ListByNomeColabController{
    async handle(req: Request, res: Response){
        const colaborador_nome = req.query.colaborador_nome as string

        const listByNomeColabService = new ListByNomeColabService;

        const colaborador = await listByNomeColabService.execute({
            colaborador_nome
        });

        return res.json(colaborador);
    }
}

export { ListByNomeColabController }