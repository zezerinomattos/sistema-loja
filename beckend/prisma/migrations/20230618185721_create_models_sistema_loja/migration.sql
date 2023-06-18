/*
  Warnings:

  - You are about to alter the column `adiantamento_salario` on the `colaboradores` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "colaboradores" ALTER COLUMN "adiantamento_salario" SET DATA TYPE INTEGER;
