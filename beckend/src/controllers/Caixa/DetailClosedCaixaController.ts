import { Request, Response } from 'express';

import { DetailClosedCaixaService } from '../../services/Caixa/DetailClosedCaixaService'

class DetailClosedCaixaController{
    async handle(req: Request, res: Response){
        const colaborador_id = req.query.colaborador_id as string;

        const detailClosedCaixaService = new DetailClosedCaixaService;

        const caixa = await detailClosedCaixaService.execute({
            colaborador_id,
        });

        return res.json(caixa);
    }
}

export { DetailClosedCaixaController }