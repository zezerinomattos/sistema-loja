import { Request, Response } from 'express';

import { CreateProdutoService } from '../../services/Produto/CreateProdutoService';

class CreateProdutoController{
    async handle(req: Request, res: Response){
        const {
            nome_produto,
            marca,
           // tamanhos_estoque, // Array de objetos contendo os tamanhos e estoque
            cor_produto, // Array de objetos contendo as cores do produto
            material,
            descricao,
            representante_id,
            fabrica_id,
            secao_id,
            categoria_id,
        } = req.body;

        const createProdutoService = new CreateProdutoService;
        
        // CONVERTENDO DADOS QUE CHEGAM DO FRONTE FORMDATE
        const nomeProduto = nome_produto.toUpperCase();
        const custo = parseFloat(req.body.custo.replace(',', '.'));         
        const porcentagem_venda = parseInt(req.body.porcentagem_venda);
        const preco_venda = parseFloat(req.body.preco_venda.replace(',', '.'));
        const margem_lucro = parseInt(req.body.margem_lucro);
        const desconto_atual = parseInt(req.body.desconto_atual);
        const desconto_maximo = parseInt(req.body.desconto_maximo);
        const descricaoProduto = descricao.toUpperCase();
        const materialProduto = material.toUpperCase();
        
        
        if(req.file){
            const { originalname, filename: foto } = req.file;

            const produto = await createProdutoService.execute({
                nome_produto: nomeProduto,
                marca,
                cor_produto,
                material: materialProduto,
                foto,
                descricao: descricaoProduto,
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
        }else{

            const foto = null;

            const produto = await createProdutoService.execute({
                nome_produto,
                marca,
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