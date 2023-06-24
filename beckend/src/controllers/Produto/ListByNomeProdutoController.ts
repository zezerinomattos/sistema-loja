import { Request, Response } from "express";

import { ListByNomeProdutoService } from '../../services/Produto/ListByNomeProdutoService';

class ListByNomeProdutoController{
    async handle(req: Request, res: Response){
        const nome_produto = req.query.nome_produto as string;

        const listByNomeProdutoService = new ListByNomeProdutoService;

        const produtos = await listByNomeProdutoService.execute({
            nome_produto
        });

        return res.json(produtos);
    }
}

export { ListByNomeProdutoController }