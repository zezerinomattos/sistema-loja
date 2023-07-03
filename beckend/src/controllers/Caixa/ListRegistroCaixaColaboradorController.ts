import { Request, Response } from "express";

import { ListRegistroCaixaColaboradorService } from '../../services/Caixa/ListRegistroCaixaColaboradorService';

class ListRegistroCaixaColaboradorController{
    async handle(req: Request, res: Response){
        const colaborador_id = req.query.colaborador_id as string;

        const listRegistroCaixaColaboradorService = new ListRegistroCaixaColaboradorService;

        const registroCaixa = await listRegistroCaixaColaboradorService.execute({
            colaborador_id
        });

        return res.json(registroCaixa);
    }
}

export { ListRegistroCaixaColaboradorController }