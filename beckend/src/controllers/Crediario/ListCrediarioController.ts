import { Request, Response } from "express";

import { ListCrediarioService } from '../../services/Crediario/ListCrediarioService';

class ListCrediarioController{
    async handle(req: Request, res: Response){

        const listCrediarioService = new ListCrediarioService;

        const crediario = await listCrediarioService.execute();

        return res.json(crediario);
    }
}

export { ListCrediarioController }