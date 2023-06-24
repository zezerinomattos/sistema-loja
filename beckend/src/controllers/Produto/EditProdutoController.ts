import { Request, Response } from "express";

import { EditProdutoService } from '../../services/Produto/EditProdutoService';

class EditProdutoController{
    async handle(req: Request, res: Response){
        const { 
            produto_id,
            nome_produto,
            marca,
            tamanhos_estoque, // Array de objetos contendo os tamanhos e estoque
            cor_produto, // Array de objetos contendo as cores do produto
            material,
            descricao,
            custo,
            porcentagem_venda,
            preco_venda,
            margem_lucro,
            desconto_atual,
            desconto_maximo,
            representante_id,
            fabrica_id,
            secao_id,
            categoria_id,
         } = req.body;

        const editProdutoService = new EditProdutoService;

        if(req.file){
            const { originalname, filename: foto } = req.file;

            const produto = await editProdutoService.execute({
                produto_id,
                nome_produto,
                marca,
                tamanhos_estoque,
                cor_produto,
                material,
                foto,
                descricao,
                custo,
                porcentagem_venda,
                preco_venda,
                margem_lucro,
                desconto_atual,
                desconto_maximo,
                representante_id,
                fabrica_id,
                secao_id,
                categoria_id,
            });

            return res.json(produto);
        }else {

            const foto = null;

            const produto = await editProdutoService.execute({
                produto_id,
                nome_produto,
                marca,
                tamanhos_estoque,
                cor_produto,
                material,
                foto,
                descricao,
                custo,
                porcentagem_venda,
                preco_venda,
                margem_lucro,
                desconto_atual,
                desconto_maximo,
                representante_id,
                fabrica_id,
                secao_id,
                categoria_id,
            });

            return res.json(produto);
        }        
    }
}

export { EditProdutoController }