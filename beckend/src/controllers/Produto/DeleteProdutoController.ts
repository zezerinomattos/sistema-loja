import { Request, Response } from "express";

import { DeleteProdutoService } from '../../services/Produto/DeleteProdutoService';

class DeleteProdutoController{
    async handle(req: Request, res: Response){
        const produto_id = req.query.produto_id as string;

        const deleteProdutoService = new DeleteProdutoService;

        const produto = await deleteProdutoService.execute({
            produto_id
        });

        return res.json(produto)
    }
}

export { DeleteProdutoController }