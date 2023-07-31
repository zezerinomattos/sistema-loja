import { Request, Response } from 'express';

import { DeleteCategoriaService } from '../../services/Categoria/DeleteCategoriaService';

class DeleteCategoriaController{
    async handle(req: Request, res: Response){
        const categoria_id = req.query.categoria_id as string;

        const deleteCategoriaService = new DeleteCategoriaService;

        const categoria = await deleteCategoriaService.execute({
            categoria_id
        });

        return res.json(categoria);
    }
}

export { DeleteCategoriaController }