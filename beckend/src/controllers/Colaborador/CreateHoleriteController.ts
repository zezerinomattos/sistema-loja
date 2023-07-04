import { Request, Response } from "express";

import { CreateHoleriteService } from '../../services/Colaborador/CreateHoleriteService';

class CreateHoleriteController{
    async handle(req: Request, res: Response){
        const { colaborador_id, mes, descontos } = req.body;

        if(!mes){
            throw new Error('Informe o mês de referência');
        }

        // Convertendo as strings para objeto Date
        const mesReferencia = new Date(mes);

        const createHoleriteService = new CreateHoleriteService;

        const holerite = await createHoleriteService.execute({
            colaborador_id, 
            mes: mesReferencia, 
            descontos
        });

        return res.json(holerite);
    }
}

export { CreateHoleriteController }