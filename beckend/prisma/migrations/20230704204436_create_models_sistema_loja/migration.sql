/*
  Warnings:

  - You are about to drop the column `adiantamento_salario` on the `colaboradores` table. All the data in the column will be lost.
  - You are about to drop the column `salario_liquido` on the `colaboradores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "colaboradores" DROP COLUMN "adiantamento_salario",
DROP COLUMN "salario_liquido",
ADD COLUMN     "quebra_caixa" DOUBLE PRECISION DEFAULT 0;
