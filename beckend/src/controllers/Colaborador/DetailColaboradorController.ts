import { Request, Response } from 'express';

import { DetailColaboradorService } from '../../services/Colaborador/DetailColaboradorService';

class DetailColaboradorController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id;
    
        const detailColaboradorService = new DetailColaboradorService;
        const colaborador = await detailColaboradorService.execute(user_id);

        return res.json(colaborador);
    }
}

export { DetailColaboradorController }