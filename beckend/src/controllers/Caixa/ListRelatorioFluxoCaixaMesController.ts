import { Request, Response } from "express";

import { ListRelatorioFluxoCaixaMesService } from '../../services/Caixa/ListRelatorioFluxoCaixaMesService';

class ListRelatorioFluxoCaixaMesController{
    async handle(req: Request, res: Response){
        const colaborador_id = req.query.colaborador_id as string;

        const listRelatorioFluxoCaixaMesService = new ListRelatorioFluxoCaixaMesService;

        const fluxoCaixa = await listRelatorioFluxoCaixaMesService.execute({
            colaborador_id
        })

        return res.json(fluxoCaixa);
    }
}

export { ListRelatorioFluxoCaixaMesController }