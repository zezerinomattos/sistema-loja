/*
  Warnings:

  - You are about to drop the column `produto_id` on the `produto_tamanhos_estoque` table. All the data in the column will be lost.
  - Added the required column `produtoCor_id` to the `produto_tamanhos_estoque` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "produto_tamanhos_estoque" DROP CONSTRAINT "produto_tamanhos_estoque_produto_id_fkey";

-- AlterTable
ALTER TABLE "produto_tamanhos_estoque" DROP COLUMN "produto_id",
ADD COLUMN     "produtoCor_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "produto_tamanhos_estoque" ADD CONSTRAINT "produto_tamanhos_estoque_produtoCor_id_fkey" FOREIGN KEY ("produtoCor_id") REFERENCES "produto_cor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
