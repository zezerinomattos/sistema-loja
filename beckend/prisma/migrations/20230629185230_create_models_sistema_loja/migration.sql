-- CreateTable
CREATE TABLE "entradas_caixa" (
    "id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_entrada" DOUBLE PRECISION NOT NULL,
    "motivo" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "entradas_caixa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entradas_caixa" ADD CONSTRAINT "entradas_caixa_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
