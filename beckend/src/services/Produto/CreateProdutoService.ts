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
    cor_produto: {
        cor: string;
        tamanhos_estoque: {
            tamanho: string;
            estoque: string;
        }[];
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
        cor_produto,
    }: ProdutoRequest){

        //Vamos verificar se já tem esse produto cadastrado
        const produtoAllReadyExists = await prismaClient.produto.findFirst({
            where: {
              nome_produto,
              marca,
            },

          });

        if(produtoAllReadyExists){
            throw new Error('Esse PRODUTO já existe em nosso Banco de dados!');
        }

        //Validando se desconto atual é menor que desconto maximo
        if(desconto_atual > desconto_maximo){
            throw new Error('O desconto atual não pode ser maior que ' + desconto_maximo);
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
        
        //Criar os registros de cores
        const corProduto = await Promise.all(cor_produto.map(async (cor) => {
            const produtoCor = await prismaClient.produtoCor.create({
            data: {
                cor: cor.cor,
                produto_id: produto.id,
            },
        });
            
            // Criar os registros de tamanhos e estoque
            const tamanhosEstoque = cor.tamanhos_estoque.map((tamanhoEstoque) => ({
                tamanho: tamanhoEstoque.tamanho,
                estoque: parseInt(tamanhoEstoque.estoque),
                produtoCor_id: produtoCor.id,
            }));
        
            return { produtoCor, tamanhosEstoque };
        }));
        
        const produtoCores = corProduto.map(({ produtoCor }) => produtoCor);
        
        const tamanhosEstoque = corProduto.flatMap(({ tamanhosEstoque }) => tamanhosEstoque);
        
        const produtosTamanhoEstoque = await prismaClient.produtoTamanhoEstoque.createMany({
            data: tamanhosEstoque,
        });

        return { produto, corProduto, produtosTamanhoEstoque };
    }
}

export { CreateProdutoService }

