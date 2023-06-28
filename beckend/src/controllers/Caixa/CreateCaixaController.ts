import { Request, Response } from "express";

import { CreateCaixaService } from '../../services/Caixa/CreateCaixaService';

class CreateCaixaController{
    async handle(req: Request, res: Response){
        const { valor_inicial, obs, colaborador_id  } = req.body;

        const createCaixaService = new CreateCaixaService;

        const caixa = await createCaixaService.execute({
            valor_inicial,
            obs, 
            colaborador_id
        });

        return res.json(caixa);
    }
}

export { CreateCaixaController }