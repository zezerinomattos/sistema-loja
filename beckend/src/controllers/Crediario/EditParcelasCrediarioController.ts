import { Request, Response } from "express";

import { EditParcelasCrediarioService } from '../../services/Crediario/EditParcelasCrediarioService';

class EditParcelasCrediarioController{
    async hadle(req: Request, res: Response){
        const { parcela_id, dataPagamento, formaPagamento, caixaRecebimentoId, obs, plataforma_pagamento, entradacartao_id, valor_recebido } = req.body;

        if(!dataPagamento){
            throw new Error('Informe a data de vencimento da primeira parcela');
        }

        // Convertendo as strings para objetos Date
        const dateFirstVencimento = new Date(dataPagamento);

        const editParcelasCrediarioService = new EditParcelasCrediarioService;

        const parcela = await editParcelasCrediarioService.execute({
            parcela_id,
            dataPagamento: dateFirstVencimento, 
            formaPagamento, 
            caixaRecebimentoId,
            obs,
            plataforma_pagamento,
            entradacartao_id, 
            valor_recebido
        });

        return res.json(parcela);
    }
}

export { EditParcelasCrediarioController }