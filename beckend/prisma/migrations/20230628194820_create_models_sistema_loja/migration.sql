/*
  Warnings:

  - Made the column `caixa_id` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_caixa_id_fkey";

-- AlterTable
ALTER TABLE "caixas" ALTER COLUMN "valor_inicial" SET DEFAULT 0,
ALTER COLUMN "obs" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "caixa_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "registrocaixas" ALTER COLUMN "obs" DROP NOT NULL;

-- AlterTable
ALTER TABLE "retiradacaixas" ALTER COLUMN "obs" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
