/*
  Warnings:

  - Added the required column `produto_id` to the `produto_tamanhos_estoque` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produto_tamanhos_estoque" ADD COLUMN     "produto_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "produto_tamanhos_estoque" ADD CONSTRAINT "produto_tamanhos_estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
