import { Request, Response } from 'express';

import { EditColaboradorService } from '../../services/Colaborador/EditPasswordColaboradorService';

class EditPasswordColaboradorController{
    async handle(req: Request, res: Response){
        const {colaborador_id, email, senha } = req.body;
        
        const editColaboradorService = new EditColaboradorService;

        const saveEmail = email.toLowerCase();
        const password = senha.toUpperCase();
        
        const colaborador = await editColaboradorService.execute({
            colaborador_id, 
            email: saveEmail, 
            senha: password,
        });

        return res.json(colaborador);
    }
}

export { EditPasswordColaboradorController };