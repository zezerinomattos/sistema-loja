import { Request, Response } from "express";

import { CreateQuebraCaixaService } from '../../services/Caixa/CreateQuebraCaixaService';

class CreateQuebraCaixaController{
    async handle(req: Request, res: Response){
        const { valor, motivo, obs, caixa_id, colaborador_id } = req.body;

        const createQuebraCaixaService = new CreateQuebraCaixaService;

        const valorQuebra = parseFloat(valor.replace(',', '.'));

        const quebraCaixa = await createQuebraCaixaService.execute({
            valor: valorQuebra, 
            motivo, 
            obs, 
            caixa_id, 
            colaborador_id,
        });

        return res.json(quebraCaixa);
    }
}

export { CreateQuebraCaixaController }