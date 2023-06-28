-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_caixa_id_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "caixa_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
