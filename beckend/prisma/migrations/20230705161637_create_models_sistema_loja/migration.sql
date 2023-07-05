/*
  Warnings:

  - The `taxas_juros` column on the `parcelas_crediario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "parcelas_crediario" DROP COLUMN "taxas_juros",
ADD COLUMN     "taxas_juros" INTEGER;
