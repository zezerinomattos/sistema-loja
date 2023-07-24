/*
  Warnings:

  - Added the required column `complemento_renda` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresa` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profissao` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renda_fixa` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "complemento_renda" TEXT NOT NULL,
ADD COLUMN     "empresa" TEXT NOT NULL,
ADD COLUMN     "profissao" TEXT NOT NULL,
ADD COLUMN     "renda_fixa" TEXT NOT NULL;
