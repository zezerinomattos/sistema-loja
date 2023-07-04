import { Request, Response } from "express";

import { ListFullOrderService } from '../../services/Order/ListFullOrderService';

class ListFullOrderController{
    async handle(req: Request, res: Response){

        const fullListOrderService = new ListFullOrderService;

        const order = await fullListOrderService.execute();

        return res.json(order);
    }
}

export { ListFullOrderController }