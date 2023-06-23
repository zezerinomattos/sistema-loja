import { Request, Response } from 'express';

import { ListProdutosService } from '../../services/Produto/ListProdutosService';

class ListProdutosController{
    async handle(req: Request, res: Response){

        const listProdutosService = new ListProdutosService;

        const produto = await listProdutosService.execute();

        return res.json(produto);
    }
}

export { ListProdutosController };