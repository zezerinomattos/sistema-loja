import { Request, Response } from 'express';

import { CreateCategoriaService } from '../../services/Categoria/CreateCategoriaService';

class CreateCategoriaController{
    async handle(req: Request, res: Response){
        const { nome_categoria } = req.body;

        const createCategoriaService = new CreateCategoriaService;

        const categoria = await createCategoriaService.execute({
            nome_categoria
        });

        return res.json(categoria);
    }
}

export { CreateCategoriaController }