/*
  Warnings:

  - You are about to drop the column `fabrica_id` on the `fabricas` table. All the data in the column will be lost.
  - Added the required column `representante_id` to the `fabricas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "fabricas" DROP CONSTRAINT "fabricas_fabrica_id_fkey";

-- AlterTable
ALTER TABLE "fabricas" DROP COLUMN "fabrica_id",
ADD COLUMN     "representante_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "fabricas" ADD CONSTRAINT "fabricas_representante_id_fkey" FOREIGN KEY ("representante_id") REFERENCES "representantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
