import prismaClient from "../../prisma";

interface ProdutoRequest{
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

class CreateProdutoService{
    async execute({ 
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

        //Vamos verificar se já tem esse produto cadastrado
        const produtoAllReadyExists = await prismaClient.produto.findFirst({
            where: {
                nome_produto: nome_produto,
                marca: marca,
            }
        });

        if(produtoAllReadyExists){
            throw new Error('Esse PRODUTO já existe em nosso Banco de dados!');
        }

        // Salvando o produto
        const produto = await prismaClient.produto.create({
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
            },
        });

        // Criar os registros de tamanhos e estoque na tabela ProdutoTamanhoEstoque
        const tamanhosEstoque  = tamanhos_estoque.map((tamanhoEstoque) => ({
            tamanho: tamanhoEstoque.tamanho,
            estoque: tamanhoEstoque.estoque,
            produto_id: produto.id
        }));

        const produtosTamanhoEstoque  = await prismaClient.produtoTamanhoEstoque.createMany({
            data: tamanhosEstoque,
        }); 
        
        // Criar os registros de cores
        const corProduto = cor_produto.map((cor) => ({
            cor: cor.cor,
            produto_id: produto.id
        }));

        const produtoCores = await prismaClient.produtoCor.createMany({
            data: corProduto,
        })
        

        return produto;
    }
}

export { CreateProdutoService }