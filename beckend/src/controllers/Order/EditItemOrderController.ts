import { Request, Response } from "express";

import { EditItemOrderService } from '../../services/Order/EditItemOrderService';

class EditItemOrderController{
    async handle(req: Request, res: Response){
        // const { item_id, qtd } = req.body;

        // const editItemOrderService = new EditItemOrderService;

        // const editItem = await editItemOrderService.execute({
        //     item_id, 
        //     qtd,
        // });

        // return res.json(editItem);
    }
}

export { EditItemOrderController }