import { Request, Response } from 'express';

import { DetailProdutoService } from '../../services/Produto/DetailProdutoService';

class DetailProdutoController{
    async handle(req: Request, res: Response){
        const produto_id = req.query.produto_id as string;

        const detailProdutoService = new DetailProdutoService;

        const produto = await detailProdutoService.execute({
            produto_id
        });

        return res.json(produto);
    }
}

export { DetailProdutoController }