import { Request, Response } from "express";

import { DetailContaService } from '../../services/ContasPagar/DetailContaService';

class DetailContaController{
    async handle(req: Request, res: Response){
        const conta_id = req.query.conta_id as string;

        const detailContaService = new DetailContaService;

        const conta = await detailContaService.execute({
            conta_id,
        });

        return res.json(conta);
    }
}

export { DetailContaController }