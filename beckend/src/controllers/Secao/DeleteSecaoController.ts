import { Request, Response } from 'express';

import { DeleteSecaoService } from '../../services/Secao/DeleteSecaoService';

class DeleteSecaoController{
    async handle(req: Request, res: Response){
        const secao_id = req.query.secao_id as string;

        const deleteSecaoService = new DeleteSecaoService;

        const secao = await deleteSecaoService.execute({
            secao_id
        });

        return res.json(secao);
    }
}

export { DeleteSecaoController }