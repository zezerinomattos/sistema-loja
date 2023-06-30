/*
  Warnings:

  - You are about to drop the column `bandera_pagamento` on the `registrocaixas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "entradas_cartao" ALTER COLUMN "obs" DROP NOT NULL;

-- AlterTable
ALTER TABLE "registrocaixas" DROP COLUMN "bandera_pagamento",
ADD COLUMN     "plataforma_pagamento" TEXT;
