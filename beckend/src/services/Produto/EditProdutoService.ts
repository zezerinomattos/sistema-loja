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
    cor_produto: {
        cor: string;
        tamanhos_estoque: {
            tamanho: string;
            estoque: number;
        }[];
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

        // Obter os IDs dos produtoCor relacionados ao produto
        const produtoCoress = await prismaClient.produtoCor.findMany({
            where: {
                produto_id: produto_id,
            },
            select: {
                id: true,
            },
        });
        
        // Extrair os IDs dos produtoCor
        const produtoCorIds = produtoCoress.map((produtoCor) => produtoCor.id);
        
        // Deletar os tamanhos e estoque relacionados aos produtoCor
        await prismaClient.produtoTamanhoEstoque.deleteMany({
            where: {
                produtoCor_id: {
                    in: produtoCorIds,
                },
            },
        });
        
        // Deletar as cores relacionadas ao produto
        await prismaClient.produtoCor.deleteMany({
            where: {
                produto_id: produto_id,
            },
        });
        

        // Criar as novas cores relacionadas ao produto
        const novasCores = await Promise.all(
            cor_produto.map(async (cor) => {
            const produtoCor = await prismaClient.produtoCor.create({
                data: {
                    cor: cor.cor,
                    produto_id: produto_id,
                },
            });
        
            // Criar os registros de tamanhos e estoque
            const tamanhosEstoque = cor.tamanhos_estoque.map((tamanhoEstoque) => ({
                tamanho: tamanhoEstoque.tamanho,
                estoque: tamanhoEstoque.estoque,
                produtoCor_id: produtoCor.id,
            }));
        
            return { produtoCor, tamanhosEstoque };
            })
        );
        
        const produtoCores = novasCores.map(({ produtoCor }) => produtoCor);
        
        const tamanhosEstoque = novasCores.flatMap(({ tamanhosEstoque }) => tamanhosEstoque);
        
        // Criar os novos tamanhos e estoque para cada cor
        const produtosTamanhoEstoque = await prismaClient.produtoTamanhoEstoque.createMany({
            data: tamanhosEstoque,
        });
        
        return {
            updatedProduto,
            novasCores
        };
    }
}

export { EditProdutoService };