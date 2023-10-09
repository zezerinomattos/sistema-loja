import { Request, Response } from 'express';

import { ListQuebraCaixaService } from '../../services/Caixa/ListQuebraCaixaService';

class ListQuebraCaixaController{
    async handle(req: Request, res: Response){

        const listQuebraCaixaService = new ListQuebraCaixaService()

        const quebraCaixa = await listQuebraCaixaService.execute();

        return res.json(quebraCaixa);
    }
}

export { ListQuebraCaixaController }