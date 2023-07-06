import { Request, Response } from "express";

import { ListFullContaService } from '../../services/ContasPagar/ListFullContaService';

class ListFullContaController{
    async handle(req: Request, res: Response){

        const listFullContaService = new ListFullContaService;

        const conta = await listFullContaService.execute();

        return res.json(conta);
    }
}

export { ListFullContaController }