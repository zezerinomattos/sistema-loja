import { Request, Response } from "express"

import { ListOrderColaboradorDateService } from '../../services/Order/ListOrderColaboradorDateService';

class ListOrderColaboradorDateController{
    async handle(req: Request, res: Response){
        const { data_inicial, data_final, colaborador_id, colaborador_name } = req.body;

        if(!data_inicial || !data_final){
            throw new Error('Informe o periodo de pesquisa');
        }

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listOrderColaboradorDateService = new ListOrderColaboradorDateService;

        const order = await listOrderColaboradorDateService.execute({
            data_inicial: dataInicial,
            data_final: dataFinal, 
            colaborador_id, 
            colaborador_name,
        });

        return res.json(order);
    }
}

export { ListOrderColaboradorDateController }