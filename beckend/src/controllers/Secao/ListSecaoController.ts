import { Request, Response } from 'express';

import { ListSecaoService } from '../../services/Secao/ListSecaoService';

class ListSecaoController{
    async handle(req: Request, res: Response){
        
        const listSecaoService = new ListSecaoService;
        const secao = await listSecaoService.execute();

        return res.json(secao);
    }
}

export { ListSecaoController }