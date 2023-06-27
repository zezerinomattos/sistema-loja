import { Request, Response } from "express";

import { ListDraftOrderService } from '../../services/Order/ListDraftOrderService';

class ListDraftOrderController{
    async handle(req: Request, res: Response){
        const listDraftOrderService = new ListDraftOrderService;

        const listDraft = await listDraftOrderService.execute();

        return res.json(listDraft);
    }
}

export { ListDraftOrderController }