import { Request, Response } from "express";

import { ListBySecaoService } from '../../services/Produto/ListBySecaoService';

class ListBySecaoController{
    async handle(req: Request, res: Response){
        const secao_id = req.query.secao_id as string;

        const listBySecaoService = new ListBySecaoService;

        const produto = await listBySecaoService.execute({
            secao_id
        });

        return res.json(produto);
    }
}

export { ListBySecaoController }