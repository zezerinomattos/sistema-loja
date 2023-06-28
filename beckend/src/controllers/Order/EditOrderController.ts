import { Request, Response } from "express";

import { EditOrderService } from '../../services/Order/EditOrderService';

class EditOrderController{
    async handle(req: Request, res: Response){
        const { order_id, desconto, caixa_id } = req.body;

        const editOrderService = new EditOrderService;

        const order = await editOrderService.execute({
            order_id, 
            desconto,
            caixa_id
        });

        return res.json(order)
    }
}

export { EditOrderController }