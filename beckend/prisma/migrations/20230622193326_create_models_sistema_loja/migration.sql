/*
  Warnings:

  - Added the required column `cnpj` to the `fabricas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresa` to the `fabricas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razaosocial` to the `fabricas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fabricas" ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "empresa" TEXT NOT NULL,
ADD COLUMN     "razaosocial" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
