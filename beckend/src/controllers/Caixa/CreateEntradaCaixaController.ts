import { Request, Response } from "express";

import { CreateEntradaCaixaService } from '../../services/Caixa/CreateEntradaCaixaService';

class CreateEntradaCaixaController{
    async handle(req: Request, res: Response){
        const { colaborador_id, valor_entrada, motivo, obs, caixa_id } = req.body;

        const createEntradaCaixaService = new CreateEntradaCaixaService;

        const valorEntrada = parseFloat(valor_entrada.replace(',', '.'));  

        const entradaCaixa = await createEntradaCaixaService.execute({
            colaborador_id, 
            valor_entrada: valorEntrada, 
            motivo, 
            obs, 
            caixa_id 
        });

        return res.json(entradaCaixa);
    }
}

export { CreateEntradaCaixaController }