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
    "tamanho" TEXT NOT NULL,
    "cor_primaria" TEXT NOT NULL,
    "cor_segundaria" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "estoque" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "custo" TEXT NOT NULL,
    "porcentagem_venda" TEXT NOT NULL,
    "preco_venda" TEXT NOT NULL,
    "margem_lucro" TEXT NOT NULL,
    "desconto_atual" TEXT NOT NULL,
    "desconto_maximo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "secao_id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "fabrica_id" TEXT NOT NULL,
    "representante_id" TEXT NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_secao_id_fkey" FOREIGN KEY ("secao_id") REFERENCES "secoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_fabrica_id_fkey" FOREIGN KEY ("fabrica_id") REFERENCES "fabricas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_representante_id_fkey" FOREIGN KEY ("representante_id") REFERENCES "representantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
