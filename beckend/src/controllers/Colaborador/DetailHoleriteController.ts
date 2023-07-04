import { Request, Response } from "express";

import { DetailHoleriteService } from '../../services/Colaborador/DetailHoleriteService';

class DetailHoleriteController{
    async handle(req: Request, res: Response){
        const holerite_id = req.query.holerite_id as string;

        const detailHoleriteService = new DetailHoleriteService;

        const holerite = await detailHoleriteService.execute({
            holerite_id,
        });

        return res.json(holerite);
    }
}

export { DetailHoleriteController }