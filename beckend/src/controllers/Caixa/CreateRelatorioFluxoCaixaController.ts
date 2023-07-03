import { Request, Response } from "express";

import { CreateRelatorioFluxoCaixaService } from '../../services/Caixa/CreateRelatorioFluxoCaixaService';

class CreateRelatorioFluxoCaixaController{
    async handle(req: Request, res: Response){
        const caixa_id = req.query.caixa_id as string;

        const createRelatorioFluxoCaixaService = new CreateRelatorioFluxoCaixaService;

        const fluxoCaixa = await createRelatorioFluxoCaixaService.execute({
            caixa_id
        });

        return res.json(fluxoCaixa);
    }
}

export { CreateRelatorioFluxoCaixaController }