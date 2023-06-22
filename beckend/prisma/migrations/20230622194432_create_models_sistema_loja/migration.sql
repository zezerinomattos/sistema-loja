/*
  Warnings:

  - You are about to drop the column `cnpj` on the `representantes` table. All the data in the column will be lost.
  - You are about to drop the column `razaosocial` on the `representantes` table. All the data in the column will be lost.
  - You are about to drop the column `telefone_fabrica` on the `representantes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "representantes" DROP COLUMN "cnpj",
DROP COLUMN "razaosocial",
DROP COLUMN "telefone_fabrica";
