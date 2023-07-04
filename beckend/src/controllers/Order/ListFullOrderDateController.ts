import { Request, Response } from "express";

import { ListFullOrderDateService } from '../../services/Order/ListFullOrderDateService';

class ListFullOrderDateController{
    async handle(req: Request, res: Response){
        const { data_inicial, data_final } = req.body;

        if(!data_inicial || !data_final){
            throw new Error('Informe o periodo de pesquisa');
        }

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listFullOrderDateService = new ListFullOrderDateService;

        // convertido para poder testar no Insominia.
        const order = await listFullOrderDateService.execute({
            data_inicial: dataInicial,
            data_final: dataFinal,
        });

        res.json(order);
    }
}

export { ListFullOrderDateController }