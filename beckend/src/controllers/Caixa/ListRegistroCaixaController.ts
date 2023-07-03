import { Request, Response } from "express";

import { ListRegistroCaixaService } from '../../services/Caixa/ListRegistroCaixaService';

class ListRegistroCaixaController{
    async handle(req: Request, res: Response){
        const listRegistroCaixaService = new ListRegistroCaixaService;

        const registroCaixa = await listRegistroCaixaService.execute();

        return res.json(registroCaixa);
    }
}

export { ListRegistroCaixaController }