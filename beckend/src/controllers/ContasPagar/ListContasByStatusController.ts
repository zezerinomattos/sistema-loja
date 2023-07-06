import { Request, Response } from "express"

import { ListContasByStatusService } from '../../services/ContasPagar/ListContasByStatusService';

class ListContasByStatusController{
    async handle(req: Request, res: Response){
        const { data_inicial, data_final, status } = req.body;

        const listContasByStatusService = new ListContasByStatusService;

        if(!data_inicial || !data_final){
            const conta = await listContasByStatusService.execute({
                data_inicial, 
                data_final,
                status,
            });
            return res.json(conta);
        }

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const conta = await listContasByStatusService.execute({
            data_inicial: dataInicial, 
            data_final: dataFinal,
            status,
        });

        return res.json(conta);
    }
}

export { ListContasByStatusController }