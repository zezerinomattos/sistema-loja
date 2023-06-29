-- AlterTable
ALTER TABLE "entradas_caixa" ALTER COLUMN "motivo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "registrocaixas" ADD COLUMN     "entradacartao_id" TEXT;

-- AlterTable
ALTER TABLE "retiradacaixas" ALTER COLUMN "motivo" DROP NOT NULL;

-- CreateTable
CREATE TABLE "entradas_cartao" (
    "id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_entrada" DOUBLE PRECISION NOT NULL,
    "motivo" TEXT,
    "obs" TEXT NOT NULL,
    "cliente_paga_juros" BOOLEAN NOT NULL DEFAULT true,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "entradas_cartao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registrocaixas" ADD CONSTRAINT "registrocaixas_entradacartao_id_fkey" FOREIGN KEY ("entradacartao_id") REFERENCES "entradas_cartao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entradas_cartao" ADD CONSTRAINT "entradas_cartao_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
