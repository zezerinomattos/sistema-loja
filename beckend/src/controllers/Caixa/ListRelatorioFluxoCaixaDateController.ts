import { Request, Response } from "express";

import { ListRelatorioFluxoCaixaDateService } from '../../services/Caixa/ListRelatorioFluxoCaixaDateService';

class ListRelatorioFluxoCaixaDateController{
    async handle(req: Request, res: Response){
        const { data_inicial, data_final } = req.body;

        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listRelatorioFluxoCaixaDateService = new ListRelatorioFluxoCaixaDateService;

        // convertido para poder testar no Insominia.
        const relatorioCaixa = await listRelatorioFluxoCaixaDateService.execute({
            data_inicial: dataInicial,
            data_final: dataFinal,
        });

        return res.json(relatorioCaixa);
    }
}

export { ListRelatorioFluxoCaixaDateController }