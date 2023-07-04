import { Request, Response } from "express";

import { ListFullHoleriteService } from '../../services/Colaborador/ListFullHoleriteService';

class ListFullHoleriteController{
    async handle(req: Request, res: Response){
        const listFullHoleriteService = new ListFullHoleriteService;

        const holerite = await listFullHoleriteService.execute();

        return res.json(holerite);
    }
}

export { ListFullHoleriteController }