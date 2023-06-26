import { Request, Response } from "express";

import { DeleteItemService } from '../../services/Order/DeleteItemService';

class DeleteItemController{
    async handle(req: Request, res: Response){
        const item_id = req.query.item_id as string;

        const deleteItemService = new DeleteItemService;

        const item = await deleteItemService.execute({
            item_id
        });

        return res.json(item);
    }
}

export { DeleteItemController }