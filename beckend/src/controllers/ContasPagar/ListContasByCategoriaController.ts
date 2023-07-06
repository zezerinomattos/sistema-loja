import { Request, Response } from "express"

import { ListContasByCategoriaService } from '../../services/ContasPagar/ListContasByCategoriaService';


class ListContasByCategoriaController{
    async handle(req: Request, res: Response){
        const { data_inicial, data_final, categoria } = req.body;

        const listContasByCategoriaService = new ListContasByCategoriaService;

        if(!data_inicial || !data_final){
            const conta = await listContasByCategoriaService.execute({
                data_inicial, 
                data_final,
                categoria,
            });
            return res.json(conta);
        }

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const conta = await listContasByCategoriaService.execute({
            data_inicial: dataInicial, 
            data_final: dataFinal,
            categoria,
        });

        return res.json(conta);
    }
}

export { ListContasByCategoriaController }