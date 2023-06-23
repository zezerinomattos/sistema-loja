-- CreateTable
CREATE TABLE "produto_cor" (
    "id" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,

    CONSTRAINT "produto_cor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produto_cor" ADD CONSTRAINT "produto_cor_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
