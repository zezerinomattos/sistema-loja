import { Request, Response } from 'express';

import { DetailClienteService } from '../../services/Cliente/DetailClienteService';

class DetailClienteController{
    async handle(req: Request, res: Response){
        const cliente_id = req.query.cliente_id as string;

        const detailClienteService = new DetailClienteService;

        const cliente = await detailClienteService.execute({
            cliente_id
        });

        return res.json(cliente);
    }
}

export { DetailClienteController }