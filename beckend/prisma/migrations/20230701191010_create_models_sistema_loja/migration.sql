-- AlterTable
ALTER TABLE "colaboradores" ALTER COLUMN "complemento_salario" DROP NOT NULL,
ALTER COLUMN "limite_credito" DROP NOT NULL,
ALTER COLUMN "limite_credito" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "quebras_caixa" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" DOUBLE PRECISION NOT NULL,
    "motivo" TEXT NOT NULL,
    "obs" TEXT,
    "caixa_id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,

    CONSTRAINT "quebras_caixa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quebras_caixa" ADD CONSTRAINT "quebras_caixa_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quebras_caixa" ADD CONSTRAINT "quebras_caixa_colaborador_id_fkey" FOREIGN KEY ("colaborador_id") REFERENCES "colaboradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
