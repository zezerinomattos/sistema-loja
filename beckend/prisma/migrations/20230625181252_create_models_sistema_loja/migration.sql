/*
  Warnings:

  - Added the required column `cor_id` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tamanho_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "cor_id" TEXT NOT NULL,
ADD COLUMN     "tamanho_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_tamanho_id_fkey" FOREIGN KEY ("tamanho_id") REFERENCES "produto_tamanhos_estoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_cor_id_fkey" FOREIGN KEY ("cor_id") REFERENCES "produto_cor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
