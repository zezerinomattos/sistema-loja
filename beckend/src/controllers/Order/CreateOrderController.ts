import { Request, Response } from "express";

import { CreateOrderService } from '../../services/Order/CreateOrderService';

class CreateOrderController{
    async handle(req: Request, res: Response){
        const { status, draft, colaborado, cliente, caixa_id } = req.body;

        const createOrderService = new CreateOrderService;

        const order = await createOrderService.execute({
            status, 
            draft, 
            colaborado, 
            cliente,
            caixa_id
        });

        return res.json(order);
    }
}

export { CreateOrderController }