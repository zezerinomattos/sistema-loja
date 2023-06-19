import { Request, Response } from 'express';

import { AuthColaboradorService } from '../../services/Colaborador/AuthColaboradorService';


class AuthColaboradorController{
    async handle(req: Request, res: Response){
        const { email, senha } = req.body;

        const authColaboradorService = new AuthColaboradorService();

        const auth = await authColaboradorService.execute({ 
            email,
            senha 
        });

        return res.json(auth);
    }
}

export { AuthColaboradorController }
