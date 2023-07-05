import { Request, Response } from "express";

import { CreateRegistroCaixaService } from '../../services/Caixa/CreateRegistroCaixaService';

class CreateRegistroCaixaController{
    async handle(req: Request, res: Response){
        const { order_id, valor_recebido, forma_pagamento, bandera_pagamento, obs, caixa_id, entradacartao_id, crediario_id } = req.body;

        const createRegistroCaixaService = new CreateRegistroCaixaService;

        const registroCaixa = await createRegistroCaixaService.execute({
            order_id, 
            valor_recebido, 
            forma_pagamento, 
            bandera_pagamento, 
            obs, 
            caixa_id, 
            entradacartao_id, 
            crediario_id
        });

        return res.json(registroCaixa)
    }
}

export { CreateRegistroCaixaController }