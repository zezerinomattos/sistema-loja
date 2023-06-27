import { Request, Response } from "express";

import { EditOrderService } from '../../services/Order/EditOrderService';

class EditOrderController{
    async handle(req: Request, res: Response){
        const { order_id, desconto } = req.body;

        const editOrderService = new EditOrderService;

        const order = await editOrderService.execute({
            order_id, 
            desconto
        });

        return res.json(order)
    }
}

export { EditOrderController }