import { Request, Response } from "express";

import { EditQuebraCaixaService } from '../../services/Caixa/EditQuebraCaixaService';

class EditQuebraCaixaController{
    async handle(req: Request, res: Response){
        const { quebraCaixa_id, motivo_reversao} = req.body;

        const editQuebraCaixaService = new EditQuebraCaixaService;

        const quebraCaixa = await editQuebraCaixaService.execute({
            quebraCaixa_id, 
            motivo_reversao,
        });

        return res.json(quebraCaixa);
    }
}

export { EditQuebraCaixaController }