import { Request, Response } from "express";

import { ListCrediarioDateService } from '../../services/Crediario/ListCrediarioDateService';

class ListCrediarioDateController{
    async handle(req:Request, res: Response){
        const { data_inicial, data_final, cliente_id } = req.body;

        if(!data_inicial || !data_final){
            throw new Error('Informe o periodo de pesquisa');
        }

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listCrediarioDateService = new ListCrediarioDateService;

        const crediario = await listCrediarioDateService.execute({
            data_inicial: dataInicial, 
            data_final: dataFinal,
            cliente_id,
        });

        return res.json(crediario);
    }
}

export { ListCrediarioDateController }