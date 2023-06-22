import { Request, Response } from 'express';

import { DetailRepresentanteService } from '../../services/Representante/DetailRepresentanteService';

class DetailRepresentanteController{
    async handle(req: Request, res: Response){
        const representante_id = req.query.representante_id as string;

        const detailRepresentanteService = new DetailRepresentanteService;

        const representante = await detailRepresentanteService.execute({
            representante_id,
        });

        return res.json(representante);
    }

}

export { DetailRepresentanteController };