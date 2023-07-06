import { Request, Response } from "express";

import { ListParcelasAtrasadasDateService } from '../../services/Crediario/ListParcelasAtrasadasDateService';

class ListParcelasAtrasadasDateController{
    async handle(req: Request, res: Response){
        const { cliente_id, data_inicial, data_final } = req.body;

        if(!data_inicial || !data_final){
            throw new Error('Informe o periodo de pesquisa');
        }

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listParcelasAtrasadasDateService = new ListParcelasAtrasadasDateService;

        const parcela = await listParcelasAtrasadasDateService.execute({
            cliente_id, 
            data_inicial: dataInicial, 
            data_final: dataFinal,
        });

        return res.json(parcela);
    }
}

export { ListParcelasAtrasadasDateController }