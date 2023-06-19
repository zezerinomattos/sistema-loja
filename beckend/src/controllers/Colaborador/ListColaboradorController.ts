import { Request, Response } from 'express';

import { ListColaboradorService } from '../../services/Colaborador/ListColaboradorService';

class ListColaboradorController{
    async handle(req: Request, res: Response){
        const listColaboradorService = new ListColaboradorService;

        const colaborador = await listColaboradorService.execute();

        return res.json(colaborador);
    }
}

export { ListColaboradorController };