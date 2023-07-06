import { Request, Response } from "express";

import { ListParcelasAtrasatasFullService } from '../../services/Crediario/ListParcelasAtrasatasFullService';

class ListParcelasAtrasatasFullController{
    async handle(req: Request, res: Response){
        const listParcelasAtrasatasFullService = new ListParcelasAtrasatasFullService;

        const parcelas = await listParcelasAtrasatasFullService.execute();

        return res.json(parcelas);
    }
}

export { ListParcelasAtrasatasFullController }