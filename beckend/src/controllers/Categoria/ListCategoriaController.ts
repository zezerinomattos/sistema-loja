import { Request, Response } from 'express';

import { ListCategoriaService } from '../../services/Categoria/ListCategoriaService';

class ListCategoriaController{
    async handle(req: Request, res: Response){
        
        const listCategoriaService = new ListCategoriaService; 

        const categoria = await listCategoriaService.execute();

        return res.json(categoria);
    }
}

export { ListCategoriaController }