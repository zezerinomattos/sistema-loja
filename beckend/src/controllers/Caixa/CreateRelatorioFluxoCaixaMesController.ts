import { Request, Response } from "express";

import { CreateRelatorioFluxoCaixaMesService } from '../../services/Caixa/CreateRelatorioFluxoCaixaMesService';

class CreateRelatorioFluxoCaixaMesController{
    async handle(req: Request, res: Response){
        const colaborador_id = req.query.colaborador_id as string;

        const createRelatorioFluxoCaixaMesService = new CreateRelatorioFluxoCaixaMesService;

        const fluxoCaixa = await createRelatorioFluxoCaixaMesService.execute({
            colaborador_id
        })

        return res.json(fluxoCaixa);
    }
}

export { CreateRelatorioFluxoCaixaMesController }