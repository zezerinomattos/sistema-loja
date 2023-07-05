import { Request, Response } from "express";

import { DetailCrediarioService } from '../../services/Crediario/DetailCrediarioService';

class DetailCrediarioController{
    async handle(req: Request, res: Response){
        const crediario_id = req.query.crediario_id as string;

        const detailCrediarioService = new DetailCrediarioService;

        const crediario = await detailCrediarioService.execute({
            crediario_id,
        });

        return res.json(crediario);
    }
}

export { DetailCrediarioController }