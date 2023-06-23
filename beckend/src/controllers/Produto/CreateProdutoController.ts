import { Request, Response } from 'express';

import { CreateProdutoService } from '../../services/Produto/CreateProdutoService';

class CreateProdutoController{
    async handle(req: Request, res: Response){
        const {
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

        const createProdutoService = new CreateProdutoService;

        if(!req.file){
            throw new Error('Error upload file');
        }else{
            const { originalname, filename: foto } = req.file;


            const produto = await createProdutoService.execute({
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

export { CreateProdutoController }