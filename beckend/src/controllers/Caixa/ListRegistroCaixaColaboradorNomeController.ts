import { Request, Response } from "express";

import { ListRegistroCaixaColaboradorNomeService } from '../../services/Caixa/ListRegistroCaixaColaboradorNomeService';

class ListRegistroCaixaColaboradorNomeController{
    async handle(req: Request, res: Response){
        const nome_colaborador = req.query.nome_colaborador as string

        const listRegistroCaixaColaboradorNomeService = new ListRegistroCaixaColaboradorNomeService;

        const registroCaixa = await listRegistroCaixaColaboradorNomeService.execute({
            nome_colaborador
        });

        return res.json(registroCaixa);
    }
}

export { ListRegistroCaixaColaboradorNomeController }