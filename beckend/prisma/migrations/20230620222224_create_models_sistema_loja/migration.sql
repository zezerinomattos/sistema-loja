/*
  Warnings:

  - Changed the type of `nascimento` on the `usuarios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "nascimento",
ADD COLUMN     "nascimento" TIMESTAMP(3) NOT NULL;
