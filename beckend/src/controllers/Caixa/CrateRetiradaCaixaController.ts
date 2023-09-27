import { Request, Response } from "express";

import { CrateRetiradaCaixaService } from '../../services/Caixa/CrateRetiradaCaixaService';

class CrateRetiradaCaixaController{
    async handle(req: Request, res: Response){
        const { colaborador_id, valor_retirado, motivo, obs, caixa_id  } = req.body;

        const crateRetiradaCaixaService = new CrateRetiradaCaixaService;

        const valorRetirada = parseFloat(valor_retirado.replace(',', '.')); 

        const retiradaCaixa = await crateRetiradaCaixaService.execute({
            colaborador_id, 
            valor_retirado: valorRetirada, 
            motivo, 
            obs, 
            caixa_id 
        });

        return res.json(retiradaCaixa);
    }
}

export { CrateRetiradaCaixaController }