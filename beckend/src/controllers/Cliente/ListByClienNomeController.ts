import { Request, Response } from "express";

import { ListByClienNomeService } from '../../services/Cliente/ListByClienNomeService';

class ListByClienNomeController{
    async handle(req: Request, res: Response){
        const nome_cliente = req.query.nome_cliente as string

        const listByClienNomeService = new ListByClienNomeService;

        const cliente = await listByClienNomeService.execute({
            nome_cliente
        });

        return res.json(cliente)
    }
}

export { ListByClienNomeController }