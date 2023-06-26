/*
  Warnings:

  - You are about to drop the column `produto_id` on the `produto_tamanhos_estoque` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "produto_tamanhos_estoque" DROP CONSTRAINT "produto_tamanhos_estoque_produto_id_fkey";

-- AlterTable
ALTER TABLE "produto_tamanhos_estoque" DROP COLUMN "produto_id";
