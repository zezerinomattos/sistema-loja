import { Request, Response } from "express";

import { CreateOrderService } from '../../services/Order/CreateOrderService';

class CreateOrderController{
    async handle(req: Request, res: Response){
        const { colaborado_id, cliente_id, caixa_id } = req.body;

        const createOrderService = new CreateOrderService;

        const order = await createOrderService.execute({
            colaborado_id, 
            cliente_id,
            caixa_id
        });

        return res.json(order);
    }
}

export { CreateOrderController }