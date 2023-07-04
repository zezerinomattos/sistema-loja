import { Request, Response } from "express";

import { ListOrderColaboradorService } from '../../services/Order/ListOrderColaboradorService';

class ListOrderColaboradorController{
    async handle(req: Request, res: Response){
        const colaborador_id = req.query.colaborador_id as string;

        const listOrderColaboradorService = new ListOrderColaboradorService;

        const order = await listOrderColaboradorService.execute({
            colaborador_id,
        });
        return res.json(order);
    }
}

export { ListOrderColaboradorController }