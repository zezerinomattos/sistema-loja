import prismaClient from "../../prisma";

interface ProdutoRequest{
    produto_id: string;
    nome_produto: string;
    marca: string;
    material: string;
    foto: string;
    descricao: string;
    custo: number;
    porcentagem_venda: number;
    preco_venda: number;
    margem_lucro: number;
    desconto_atual: number;
    desconto_maximo: number;
    representante_id: string;
    fabrica_id: string;
    secao_id: string;
    categoria_id: string;
    tamanhos_estoque: {
        tamanho: string;
        estoque: number;
    }[];
    cor_produto: {
        cor: string;
    }[];
}

class EditProdutoService{
    async execute({
        produto_id,
        nome_produto,
        marca,
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
        tamanhos_estoque,
        cor_produto,
    }: ProdutoRequest){

        // Verificar se o produto existe
        const existingProduto = await prismaClient.produto.findUnique({
            where: {
                id: produto_id
            },
        });

        if(!existingProduto){
            throw new Error('Produto not found');
        }

        // Atualizar os dados do produto
        const updatedProduto = await prismaClient.produto.update({
            where: {id: produto_id},
            data:{
                nome_produto: nome_produto,
                marca: marca,
                material: material,
                foto: foto,
                descricao: descricao,
                custo: custo,
                porcentagem_venda: porcentagem_venda, 
                preco_venda: preco_venda,
                margem_lucro: margem_lucro,
                desconto_atual: desconto_atual,
                desconto_maximo: desconto_maximo,
                secao_id: secao_id,
                categoria_id: categoria_id,
                fabrica_id: fabrica_id,
                representante_id: representante_id,
            }
        });

        // Atualizar os tamanhos e estoque do produto
        await prismaClient.produtoTamanhoEstoque.deleteMany({
            where: {
            produto_id,
            },
        });

        const tamanhosEstoque = tamanhos_estoque.map((tamanhoEstoque) => ({
            tamanho: tamanhoEstoque.tamanho,
            estoque: tamanhoEstoque.estoque,
            produto_id: produto_id,
        }));
      
        const updateTamanhoProduto = await prismaClient.produtoTamanhoEstoque.createMany({
            data: tamanhosEstoque,
        });

         // Atualizar as cores do produto
        await prismaClient.produtoCor.deleteMany({
            where: {
            produto_id,
            },
        });
    
        const corProduto = cor_produto.map((cor) => ({
            cor: cor.cor,
            produto_id: produto_id,
        }));
    
        const updateCorProduto = await prismaClient.produtoCor.createMany({
            data: corProduto,
        });

        return updatedProduto;
        
    }
}

export { EditProdutoService };