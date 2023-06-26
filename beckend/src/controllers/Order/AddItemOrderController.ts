import { Request, Response } from "express";

import { AddItemOrderSevice } from '../../services/Order/AddItemOrderSevice';

class AddItemOrderController{
    async handle(req: Request, res: Response){
        const { qtd, order_id, produto_id, tamanho_id, cor_id } = req.body;

        const addItemOrderSevice = new AddItemOrderSevice;

        const order = await addItemOrderSevice.execute({
            qtd, 
            order_id, 
            produto_id, 
            cor_id,
            tamanho_id, 
        });

        return res.json(order);
    }
}

export { AddItemOrderController }