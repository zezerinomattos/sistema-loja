import { Request, Response } from "express";

import { ListParcelasAtrasadasSrvice } from '../../services/Crediario/ListParcelasAtrasadasSrvice';

class ListParcelasAtrasadasController{
    async handle(req: Request, res: Response){

        const listParcelasAtrasadasSrvice = new ListParcelasAtrasadasSrvice;

        const parcelas = await listParcelasAtrasadasSrvice.execute();

        return res.json(parcelas);
    }
}

export { ListParcelasAtrasadasController }