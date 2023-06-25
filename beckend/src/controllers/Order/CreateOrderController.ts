import { Request, Response } from "express";

import { CreateOrderService } from '../../services/Order/CreateOrderService';

class CreateOrderController{
    async handle(req: Request, res: Response){
        const { status, draft, colaborado, cliente } = req.body;

        const createOrderService = new CreateOrderService;

        const order = await createOrderService.execute({
            status, 
            draft, 
            colaborado, 
            cliente
        });

        return res.json(order);
    }
}

export { CreateOrderController }