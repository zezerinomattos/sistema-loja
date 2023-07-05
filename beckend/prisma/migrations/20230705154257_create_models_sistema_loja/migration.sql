/*
  Warnings:

  - The `taxas_juros` column on the `crediarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "crediarios" DROP COLUMN "taxas_juros",
ADD COLUMN     "taxas_juros" INTEGER;
