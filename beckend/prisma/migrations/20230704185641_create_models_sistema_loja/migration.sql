-- CreateTable
CREATE TABLE "holerite" (
    "id" TEXT NOT NULL,
    "mes" TIMESTAMP(3) NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "descontos" DOUBLE PRECISION NOT NULL,
    "bonus" DOUBLE PRECISION NOT NULL,
    "liquido" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "colaboradorId" TEXT NOT NULL,

    CONSTRAINT "holerite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "holerite" ADD CONSTRAINT "holerite_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "colaboradores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
