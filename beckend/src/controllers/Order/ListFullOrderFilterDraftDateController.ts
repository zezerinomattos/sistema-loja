import { Request, Response } from "express";

import { ListFullOrderFilterDraftDateService } from '../../services/Order/ListFullOrderFilterDraftDateService';

class ListFullOrderFilterDraftDateController{
    async handle(req: Request, res: Response){
        const { data_inicial, data_final, draft } = req.body;

        if(!data_inicial || !data_final){
            throw new Error('Informe o periodo de pesquisa');
        }

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listFullOrderFilterDraftDateService = new ListFullOrderFilterDraftDateService;

        // convertido para poder testar no Insominia.
        const order = await listFullOrderFilterDraftDateService.execute({
            draft,
            data_inicial: dataInicial,
            data_final: dataFinal,
        });

        res.json(order);
    }
}

export { ListFullOrderFilterDraftDateController }