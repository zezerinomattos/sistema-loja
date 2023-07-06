import { Request, Response } from "express"

import { ListContasByDateService } from '../../services/ContasPagar/ListContasByDateService';

class ListContasByDateController{
    async handle(req: Request, res: Response){
        const { data_inicial, data_final } = req.body;

        if(!data_inicial || !data_final){
            throw new Error('Informe o periodo de pesquisa');
        }

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listContasByDateService = new ListContasByDateService;

        const conta = await listContasByDateService.execute({
            data_inicial: dataInicial, 
            data_final: dataFinal,
        });

        return res.json(conta);
    }
}

export { ListContasByDateController }