import { Request, Response } from "express";

import { DetailCaixaService } from '../../services/Caixa/DetailCaixaService';

class DetailCaixaController{
    async handle(req: Request, res: Response){
        const colaborador_id = req.query.colaborador_id as string;

        const detailCaixaService = new DetailCaixaService;

        const caixa = await detailCaixaService.execute({
            colaborador_id,
        });

        return res.json(caixa);
    }
}

export { DetailCaixaController };