/*
  Warnings:

  - You are about to drop the column `limite_credito` on the `colaboradores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "colaboradores" DROP COLUMN "limite_credito";

-- AlterTable
ALTER TABLE "entradas_cartao" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
