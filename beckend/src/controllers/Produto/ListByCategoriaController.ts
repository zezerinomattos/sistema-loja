import { Request, Response } from "express";

import { ListByCategoriaService } from '../../services/Produto/ListByCategoriaService';

class ListByCategoriaController{
    async handle(req: Request, res: Response){
        const categoria_id = req.query.categoria_id as string;

        const listByCategoriaService = new ListByCategoriaService;

        const produtos = await listByCategoriaService.execute({
            categoria_id
        });

        return res.json(produtos);
    }
}

export { ListByCategoriaController }