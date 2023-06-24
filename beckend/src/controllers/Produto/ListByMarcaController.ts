import { Request, Response } from "express";

import { ListByMarcaSevice } from '../../services/Produto/ListByMarcaSevice';

class ListByMarcaController{
    async handle(req: Request, res: Response){
        const marca_produto = req.query.marca_produto as string;

        const listByMarcaSevice = new ListByMarcaSevice;

        const produtos = await listByMarcaSevice.execute({
            marca_produto
        });

        return res.json(produtos);
    }
}

export { ListByMarcaController }