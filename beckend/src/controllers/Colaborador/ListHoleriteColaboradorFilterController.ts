import { Request, Response } from "express";

import { ListHoleriteColaboradorFilterService } from '../../services/Colaborador/ListHoleriteColaboradorFilterService';

class ListHoleriteColaboradorFilterController{
    async handle(req: Request, res: Response){
        const { colaborador_name, colaborador_id } = req.body;

        const listHoleriteColaboradorFilterService = new ListHoleriteColaboradorFilterService;

        const holerite = await listHoleriteColaboradorFilterService.execute({
            colaborador_name, 
            colaborador_id
        });

        return res.json(holerite);
    }
}

export { ListHoleriteColaboradorFilterController }