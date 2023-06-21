import { Request, Response } from 'express';

import { DetailColaboradorService } from '../../services/Colaborador/DetailColaboradorService';

class DetailColaboradorController{
    async handle(req: Request, res: Response){
        const colaborador_id = req.query.colaborador_id as string;

        const detailColaboradorService = new DetailColaboradorService;
        const colaborador = await detailColaboradorService.execute({
            colaborador_id
        });

        return res.json(colaborador);
    }
}

export { DetailColaboradorController }