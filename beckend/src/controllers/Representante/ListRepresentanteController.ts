import { Request, Response } from 'express';

import { ListRepresentanteService } from '../../services/Representante/ListRepresentanteService';

class ListRepresentanteController{
    async handle(req: Request, res: Response){
        
        const listRepresentanteService = new ListRepresentanteService;

        const representante = await listRepresentanteService.execute();

        return res.json(representante);
    }
}

export { ListRepresentanteController }