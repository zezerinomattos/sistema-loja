import { Request, Response } from "express";

import { CreateQuebraCaixaService } from '../../services/Caixa/CreateQuebraCaixaService';

class CreateQuebraCaixaController{
    async handle(req: Request, res: Response){
        const { valor, motivo, obs, caixa_id, colaborador_id } = req.body;

        const createQuebraCaixaService = new CreateQuebraCaixaService;

        const quebraCaixa = await createQuebraCaixaService.execute({
            valor, 
            motivo, 
            obs, 
            caixa_id, 
            colaborador_id,
        });

        return res.json(quebraCaixa);
    }
}

export { CreateQuebraCaixaController }