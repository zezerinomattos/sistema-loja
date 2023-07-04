/*
  Warnings:

  - Added the required column `colaborador_nome` to the `holerite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `holerite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacao` to the `holerite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "holerite" ADD COLUMN     "celular" TEXT,
ADD COLUMN     "colaborador_nome" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "situacao" BOOLEAN NOT NULL;
