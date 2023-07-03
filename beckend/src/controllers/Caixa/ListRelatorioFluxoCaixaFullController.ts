import { Request, Response } from "express";

import { ListRelatorioFluxoCaixaFullService } from '../../services/Caixa/ListRelatorioFluxoCaixaFullService';

class ListRelatorioFluxoCaixaFullController{
    async handle(req: Request, res: Response){
        const listRelatorioFluxoCaixaFullService = new ListRelatorioFluxoCaixaFullService;

        const relatorioCaixaFull = await listRelatorioFluxoCaixaFullService.execute();

        return res.json(relatorioCaixaFull);
    }
}

export { ListRelatorioFluxoCaixaFullController }