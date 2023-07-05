import { Request, Response } from "express";

import { CreateCrediarioService } from '../../services/Crediario/CreateCrediarioService';

class CreateCrediarioController{
    async handle(req: Request, res: Response){
        const { 
            valorTotal, 
            quantidadeParcelas, 
            dataVencimento, 
            taxas_juros, 
            prazos, 
            obs, 
            cliente_id, 
            order_id, 
            caixa_id 
        } = req.body;

        if(!dataVencimento){
            throw new Error('Informe a data de vencimento da primeira parcela');
        }

        // Convertendo as strings para objetos Date
        const dateFirstVencimento = new Date(dataVencimento);

        const createCrediarioService = new CreateCrediarioService;

        const crediario = await createCrediarioService.execute({
            valorTotal, 
            quantidadeParcelas, 
            dataVencimento: dateFirstVencimento,  
            taxas_juros, 
            prazos, 
            obs, 
            cliente_id, 
            order_id, 
            caixa_id 
        });

        return res.json(crediario);
    }
}

export { CreateCrediarioController }