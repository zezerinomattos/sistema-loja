import { Request, Response } from "express";

import { CancelarRegistroCaixaService } from '../../services/Caixa/CancelarRegistroCaixaService';

class CancelarRegistroCaixaController{
    async handle(req: Request, res: Response){
        const registro_caixa_id = req.query.registro_caixa_id as string;

        const cancelarRegistroCaixaService = new CancelarRegistroCaixaService;

        const registroCaixa = await cancelarRegistroCaixaService.execute({
            registro_caixa_id
        });

        return res.json(registroCaixa);
    }
}

export { CancelarRegistroCaixaController }