import { Request, Response } from "express";

import { FullListOrderService } from '../../services/Order/FullListOrderService';

class FullListOrderController{
    async handle(req: Request, res: Response){

        const fullListOrderService = new FullListOrderService;

        const order = await fullListOrderService.execute();

        return res.json(order);
    }
}

export { FullListOrderController }