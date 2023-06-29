import { Request, Response } from "express";

import { CloseCaixaService } from '../../services/Caixa/CloseCaixaService';

class CloseCaixaController{
    async handle(req: Request, res: Response){
        const { caixa_id , valor_final, obs } = req.body;

        const closeCaixaService = new CloseCaixaService;

        const caixa = await closeCaixaService.execute({
            caixa_id,
            valor_final, 
            obs
        });

        return res.json(caixa);
    }
}

export { CloseCaixaController }