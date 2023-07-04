import { Request, Response } from "express";

import {ListRegistroCaixaColaboradorNomeDateService } from '../../services/Caixa/ListRegistroCaixaColaboradorNomeDateService';

class ListRegistroCaixaColaboradorNomeDateController{
    async handle(req: Request, res: Response){
        const {nome_colaborador, data_inicial, data_final } = req.body

        if(!data_inicial || !data_final){
            throw new Error('Informe o periodo de pesquisa');
        }
        
        // Convertendo as strings para objetos Date
        const dataInicial = new Date(data_inicial);
        const dataFinal = new Date(data_final);

        const listRegistroCaixaColaboradorNomeDateService = new ListRegistroCaixaColaboradorNomeDateService;

        // convertido para poder testar no Insominia.
        const registroCaixa = await listRegistroCaixaColaboradorNomeDateService.execute({
            nome_colaborador,
            data_inicial: dataInicial,
            data_final: dataFinal,
        });

        return res.json(registroCaixa);
    }
}

export { ListRegistroCaixaColaboradorNomeDateController }