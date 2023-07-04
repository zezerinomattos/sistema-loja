import { Request, Response } from "express";

import { ListRelatorioFluxoCaixaFullDateService } from '../../services/Caixa/ListRelatorioFluxoCaixaFullDateService';

class ListRelatorioFluxoCaixaFullDateController{
    async handle(req: Request, res: Response){
        const { data_inicial, data_final } = req.body;

        if(!data_inicial || !data_final){
            throw new Error('Informe o periodo de pesquisa');
        }
        
        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listRelatorioFluxoCaixaFullDateService = new ListRelatorioFluxoCaixaFullDateService;

        // convertido para poder testar no Insominia.
        const relatorioCaixa = await listRelatorioFluxoCaixaFullDateService.execute({
            data_inicial: dataInicial,
            data_final: dataFinal,
        });

        return res.json(relatorioCaixa);
    }
}

export { ListRelatorioFluxoCaixaFullDateController }