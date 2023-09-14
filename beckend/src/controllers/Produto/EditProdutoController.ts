import { Request, Response } from "express";

import { EditProdutoService } from '../../services/Produto/EditProdutoService';

export type ProductSizeProps = {
    tamanho: string;
    estoque: string;
  }
  
  export type ProductColorProps = {
    cor: string;
    //tamanhos_estoque: ProductSizeProps[];
    produto_tamanhos_estoque: ProductSizeProps[];
  }

class EditProdutoController{
    async handle(req: Request, res: Response){
        const { 
            produto_id,
            nome_produto,
            marca,
            cor_produto, // Array de objetos contendo as cores do produto
            material,
            descricao,
            representante_id,
            fabrica_id,
            secao_id,
            categoria_id,
         } = req.body;

        const editProdutoService = new EditProdutoService;

        // CONVERTENDO DADOS QUE CHEGAM DO FRONTE FORMDATE
        const nomeProduto = nome_produto.toUpperCase();
        const custo = parseFloat(req.body.custo.replace(',', '.'));         
        const porcentagem_venda = parseInt(req.body.porcentagem_venda);
        const preco_venda = parseFloat(req.body.preco_venda.replace(',', '.'));
        const margem_lucro = parseFloat(req.body.margem_lucro.replace(',', '.'));
        const desconto_atual = parseInt(req.body.desconto_atual);
        const desconto_maximo = parseInt(req.body.desconto_maximo);
        const descricaoProduto = descricao.toUpperCase();
        const materialProduto = material.toUpperCase();
        const marcaProduto = marca.toUpperCase();


        // Convertendo o array de cores para o formato esperado pelo serviço
        const corProduto = JSON.parse(cor_produto) as ProductColorProps[];

        if(req.file){
            const { originalname, filename: foto } = req.file;

            const produto = await editProdutoService.execute({
                produto_id,
                nome_produto: nomeProduto,
                marca: marcaProduto,
                cor_produto: corProduto,
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
        }else {

            const foto = null;

            const produto = await editProdutoService.execute({
                produto_id,
                nome_produto: nomeProduto,
                marca: marcaProduto,
                cor_produto: corProduto,
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
        }        
    }
}

export { EditProdutoController }