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
    "salario_liquido" DOUBLE PRECISION NOT NULL,
    "complemento_salario" INTEGER NOT NULL,
    "adiantamento_salario" INTEGER NOT NULL,
    "saldo_salario" DOUBLE PRECISION,
    "limite_credito" DOUBLE PRECISION NOT NULL,
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
    "cor_primaria" TEXT NOT NULL,
    "cor_segundaria" TEXT NOT NULL,
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
    "produto_id" TEXT NOT NULL,

    CONSTRAINT "produto_tamanhos_estoque_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "produto_tamanhos_estoque" ADD CONSTRAINT "produto_tamanhos_estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
