import { Request, Response } from "express";

import { CreateNewContaService } from '../../services/ContasPagar/CreateNewContaService';

class CreateNewContaController{
    async handle(req: Request, res: Response){
        const { nome, valor, dataVencimento, categoria, status, observacao } = req.body;

        if(!dataVencimento){
            throw new Error('Informe a data de vencimento');
        }

        // Convertendo as strings para objetos Date
        const Vencimento = new Date(dataVencimento);

        const createNewContaService = new CreateNewContaService;

        const newConta = await createNewContaService.execute({
            nome, 
            valor, 
            dataVencimento: Vencimento, 
            categoria, 
            status, 
            observacao
        });

        return res.json(newConta);
    }
}

export { CreateNewContaController }