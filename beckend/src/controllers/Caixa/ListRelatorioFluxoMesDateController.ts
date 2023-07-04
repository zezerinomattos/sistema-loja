import { Request, Response } from "express";

import { ListRelatorioFluxoMesDateService } from '../../services/Caixa/ListRelatorioFluxoMesDateService';

class ListRelatorioFluxoMesDateController{
    async handle(req: Request, res: Response){
        const { colaborador_id, data_inicial, data_final } = req.body;

        if(!data_inicial || !data_final){
            throw new Error('Informe o periodo de pesquisa');
        }

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listRelatorioFluxoMesDateService = new ListRelatorioFluxoMesDateService;

        // convertido para poder testar no Insominia.
        const listCaixa = await listRelatorioFluxoMesDateService.execute({
            colaborador_id, 
            data_inicial: dataInicial,
            data_final: dataFinal,
        });

        return res.json(listCaixa);
    }
}

export { ListRelatorioFluxoMesDateController }