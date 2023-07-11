import { Request, Response } from 'express';

import { AuthColaboradorService } from '../../services/Colaborador/AuthColaboradorService';


class AuthColaboradorController{
    async handle(req: Request, res: Response){
        const { email, senha } = req.body;

        const authColaboradorService = new AuthColaboradorService();

        // convertendo senha para upercase e evitar erros com o fronte que está com os inputs em caixa alta
        const password = senha.toUpperCase();
        const saveEmail = email.toLowerCase();

        const auth = await authColaboradorService.execute({ 
            email: saveEmail,
            senha: password 
        });

        return res.json(auth);
    }
}

export { AuthColaboradorController }
