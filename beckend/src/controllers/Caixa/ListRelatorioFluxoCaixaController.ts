import { Request, Response } from "express";

import { ListRelatorioFluxoCaixaService } from '../../services/Caixa/ListRelatorioFluxoCaixaService';

class ListRelatorioFluxoCaixaController{
    async handle(req: Request, res: Response){
        const caixa_id = req.query.caixa_id as string;

        const listRelatorioFluxoCaixaService = new ListRelatorioFluxoCaixaService;

        const fluxoCaixa = await listRelatorioFluxoCaixaService.execute({
            caixa_id
        });

        return res.json(fluxoCaixa);
    }
}

export { ListRelatorioFluxoCaixaController }