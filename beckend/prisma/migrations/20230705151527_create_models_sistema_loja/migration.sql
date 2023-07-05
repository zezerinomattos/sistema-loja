-- AlterTable
ALTER TABLE "registrocaixas" ADD COLUMN     "crediario_id" TEXT;

-- CreateTable
CREATE TABLE "crediarios" (
    "id" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "quantidadeParcelas" INTEGER NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3)[],
    "status" TEXT NOT NULL,
    "taxas_juros" TEXT,
    "prazos" TEXT,
    "obs" TEXT,
    "cliente_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "crediarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parcelas_crediario" (
    "id" TEXT NOT NULL,
    "numeroParcela" INTEGER NOT NULL,
    "valorParcela" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3),
    "valorPago" DOUBLE PRECISION,
    "formaPagamento" TEXT,
    "taxas_juros" TEXT,
    "obs" TEXT,
    "crediario_id" TEXT NOT NULL,

    CONSTRAINT "parcelas_crediario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registrocaixas" ADD CONSTRAINT "registrocaixas_crediario_id_fkey" FOREIGN KEY ("crediario_id") REFERENCES "crediarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crediarios" ADD CONSTRAINT "crediarios_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crediarios" ADD CONSTRAINT "crediarios_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crediarios" ADD CONSTRAINT "crediarios_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas_crediario" ADD CONSTRAINT "parcelas_crediario_crediario_id_fkey" FOREIGN KEY ("crediario_id") REFERENCES "crediarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
