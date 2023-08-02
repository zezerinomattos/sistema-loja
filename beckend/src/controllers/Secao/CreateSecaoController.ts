import { Request, Response } from 'express';

import { CreateSecaoService } from '../../services/Secao/CreateSecaoService';

class CreateSecaoController{
    async handle(req: Request, res: Response){
        const { nome_secao } = req.body;

        const createSecaoService = new CreateSecaoService;

        const nameSecao = nome_secao.toUpperCase();

        const secao = await createSecaoService.execute({
            nome_secao: nameSecao,
        })

        return res.json(secao);
    }
}

export { CreateSecaoController }