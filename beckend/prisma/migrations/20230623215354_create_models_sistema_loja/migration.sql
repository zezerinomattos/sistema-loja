/*
  Warnings:

  - You are about to drop the column `cor_primaria` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `cor_segundaria` on the `produtos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "cor_primaria",
DROP COLUMN "cor_segundaria";
