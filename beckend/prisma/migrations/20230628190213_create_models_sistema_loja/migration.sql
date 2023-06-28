/*
  Warnings:

  - Added the required column `caixa_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "caixa_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "caixas" (
    "id" TEXT NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_fechamento" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "valor_inicial" DOUBLE PRECISION NOT NULL,
    "valor_final" DOUBLE PRECISION,
    "obs" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,

    CONSTRAINT "caixas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrocaixas" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_recebido" DOUBLE PRECISION NOT NULL,
    "troco" DOUBLE PRECISION NOT NULL,
    "forma_pagamento" TEXT NOT NULL,
    "bandera_pagamento" TEXT,
    "obs" TEXT NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "registrocaixas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retiradacaixas" (
    "id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_retirado" DOUBLE PRECISION NOT NULL,
    "motivo" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "retiradacaixas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caixas" ADD CONSTRAINT "caixas_colaborador_id_fkey" FOREIGN KEY ("colaborador_id") REFERENCES "colaboradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrocaixas" ADD CONSTRAINT "registrocaixas_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retiradacaixas" ADD CONSTRAINT "retiradacaixas_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
