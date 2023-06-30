import { Request, Response } from "express";

import { CreateEntradaCartaoService } from '../../services/Caixa/CreateEntradaCartaoService';

class CreateEntradaCartaoController{
    async handle(req: Request, res: Response){
        const { colaborador_id, valor_entrada, motivo, obs, cliente_paga_juros, caixa_id } = req.body;

        const createEntradaCartaoService = new CreateEntradaCartaoService;

        const entradaCartao = await createEntradaCartaoService.execute({
            colaborador_id, 
            valor_entrada, 
            motivo, 
            obs, 
            cliente_paga_juros, 
            caixa_id
        });

        return res.json(entradaCartao);
    }
}

export { CreateEntradaCartaoController }