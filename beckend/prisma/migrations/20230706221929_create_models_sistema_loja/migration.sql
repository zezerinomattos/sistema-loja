-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL,
    "cep" TEXT,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "endereco_id" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colaboradores" (
    "id" TEXT NOT NULL,
    "situacao" BOOLEAN NOT NULL,
    "cargo" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "orgao_emissor" TEXT NOT NULL,
    "carteira_trabalho" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "pis" TEXT NOT NULL,
    "titulo_eleitor" TEXT NOT NULL,
    "zona_eleitoral" TEXT NOT NULL,
    "secao_eleitoral" TEXT NOT NULL,
    "salario_base" DOUBLE PRECISION NOT NULL,
    "complemento_salario" INTEGER,
    "bonificacao" DOUBLE PRECISION DEFAULT 0,
    "quebra_caixa" DOUBLE PRECISION DEFAULT 0,
    "total_vendas_mes" DOUBLE PRECISION DEFAULT 0,
    "saldo_salario" DOUBLE PRECISION,
    "data_admissao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "data_demisao" TIMESTAMP(3),
    "senha" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "colaboradores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "rg" TEXT,
    "orgao_emissor" TEXT,
    "celular" TEXT NOT NULL,
    "telefone" TEXT,
    "telefone_referencia1" TEXT NOT NULL,
    "nome_referencia1" TEXT NOT NULL,
    "telefone_referencia2" TEXT NOT NULL,
    "nome_referencia2" TEXT NOT NULL,
    "telefone_referencia3" TEXT NOT NULL,
    "nome_referencia3" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "limite_credito" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "situacao" BOOLEAN,
    "ultima_compra" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "representantes" (
    "id" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "representantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fabricas" (
    "id" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "razaosocial" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "representante_id" TEXT NOT NULL,

    CONSTRAINT "fabricas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "secoes" (
    "id" TEXT NOT NULL,
    "nome_secao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "secoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome_categoria" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "nome_produto" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "foto" TEXT,
    "descricao" TEXT NOT NULL,
    "custo" DOUBLE PRECISION NOT NULL,
    "porcentagem_venda" INTEGER NOT NULL,
    "preco_venda" DOUBLE PRECISION NOT NULL,
    "margem_lucro" INTEGER NOT NULL,
    "desconto_atual" INTEGER NOT NULL,
    "desconto_maximo" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "secao_id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "fabrica_id" TEXT NOT NULL,
    "representante_id" TEXT NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_tamanhos_estoque" (
    "id" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL,
    "produtoCor_id" TEXT NOT NULL,

    CONSTRAINT "produto_tamanhos_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_cor" (
    "id" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,

    CONSTRAINT "produto_cor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "valor_total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "desconto" INTEGER NOT NULL DEFAULT 0,
    "valor_pagar" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "cor_id" TEXT NOT NULL,
    "tamanho_id" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caixas" (
    "id" TEXT NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_fechamento" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "valor_inicial" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "valor_final" DOUBLE PRECISION,
    "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "obs" TEXT,
    "colaborador_id" TEXT NOT NULL,

    CONSTRAINT "caixas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrocaixas" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_recebido" DOUBLE PRECISION NOT NULL,
    "troco" DOUBLE PRECISION NOT NULL,
    "forma_pagamento" TEXT NOT NULL,
    "plataforma_pagamento" TEXT,
    "obs" TEXT,
    "status" BOOLEAN NOT NULL,
    "caixa_id" TEXT NOT NULL,
    "entradacartao_id" TEXT,
    "crediario_id" TEXT,

    CONSTRAINT "registrocaixas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retiradacaixas" (
    "id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_retirado" DOUBLE PRECISION NOT NULL,
    "motivo" TEXT,
    "obs" TEXT,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "retiradacaixas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entradas_caixa" (
    "id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_entrada" DOUBLE PRECISION NOT NULL,
    "motivo" TEXT,
    "obs" TEXT NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "entradas_caixa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entradas_cartao" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "colaborador_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_entrada" DOUBLE PRECISION NOT NULL,
    "motivo" TEXT,
    "obs" TEXT,
    "cliente_paga_juros" BOOLEAN NOT NULL DEFAULT true,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "entradas_cartao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quebras_caixa" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" DOUBLE PRECISION NOT NULL,
    "diferenca" DOUBLE PRECISION,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "motivo" TEXT NOT NULL,
    "motivo_reversao" TEXT,
    "obs" TEXT,
    "caixa_id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,

    CONSTRAINT "quebras_caixa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holerite" (
    "id" TEXT NOT NULL,
    "situacao" BOOLEAN NOT NULL,
    "colaborador_nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT,
    "celular" TEXT,
    "mes" TIMESTAMP(3) NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "descontos" DOUBLE PRECISION NOT NULL,
    "bonus" DOUBLE PRECISION NOT NULL,
    "quebra_caixa" DOUBLE PRECISION,
    "liquido" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "colaboradorId" TEXT NOT NULL,

    CONSTRAINT "holerite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crediarios" (
    "id" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "quantidadeParcelas" INTEGER NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3)[],
    "status" TEXT NOT NULL DEFAULT 'ABERTO',
    "taxas_juros" INTEGER,
    "prazos" TEXT,
    "obs" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "crediarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parcelas_crediario" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "numeroParcela" INTEGER NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3),
    "valorPago" DOUBLE PRECISION,
    "formaPagamento" TEXT,
    "taxas_juros" INTEGER,
    "obs" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crediario_id" TEXT NOT NULL,

    CONSTRAINT "parcelas_crediario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contas_a_pagar" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "categoria" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "observacao" TEXT,

    CONSTRAINT "contas_a_pagar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaboradores" ADD CONSTRAINT "colaboradores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "representantes" ADD CONSTRAINT "representantes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fabricas" ADD CONSTRAINT "fabricas_representante_id_fkey" FOREIGN KEY ("representante_id") REFERENCES "representantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_secao_id_fkey" FOREIGN KEY ("secao_id") REFERENCES "secoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_fabrica_id_fkey" FOREIGN KEY ("fabrica_id") REFERENCES "fabricas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_representante_id_fkey" FOREIGN KEY ("representante_id") REFERENCES "representantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_tamanhos_estoque" ADD CONSTRAINT "produto_tamanhos_estoque_produtoCor_id_fkey" FOREIGN KEY ("produtoCor_id") REFERENCES "produto_cor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_cor" ADD CONSTRAINT "produto_cor_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_colaborador_id_fkey" FOREIGN KEY ("colaborador_id") REFERENCES "colaboradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_tamanho_id_fkey" FOREIGN KEY ("tamanho_id") REFERENCES "produto_tamanhos_estoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_cor_id_fkey" FOREIGN KEY ("cor_id") REFERENCES "produto_cor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caixas" ADD CONSTRAINT "caixas_colaborador_id_fkey" FOREIGN KEY ("colaborador_id") REFERENCES "colaboradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrocaixas" ADD CONSTRAINT "registrocaixas_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrocaixas" ADD CONSTRAINT "registrocaixas_entradacartao_id_fkey" FOREIGN KEY ("entradacartao_id") REFERENCES "entradas_cartao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrocaixas" ADD CONSTRAINT "registrocaixas_crediario_id_fkey" FOREIGN KEY ("crediario_id") REFERENCES "crediarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retiradacaixas" ADD CONSTRAINT "retiradacaixas_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entradas_caixa" ADD CONSTRAINT "entradas_caixa_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entradas_cartao" ADD CONSTRAINT "entradas_cartao_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quebras_caixa" ADD CONSTRAINT "quebras_caixa_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quebras_caixa" ADD CONSTRAINT "quebras_caixa_colaborador_id_fkey" FOREIGN KEY ("colaborador_id") REFERENCES "colaboradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holerite" ADD CONSTRAINT "holerite_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "colaboradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crediarios" ADD CONSTRAINT "crediarios_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crediarios" ADD CONSTRAINT "crediarios_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crediarios" ADD CONSTRAINT "crediarios_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas_crediario" ADD CONSTRAINT "parcelas_crediario_crediario_id_fkey" FOREIGN KEY ("crediario_id") REFERENCES "crediarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
