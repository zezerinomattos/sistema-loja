-- CreateTable
CREATE TABLE "contas_a_pagar" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "categoria" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "observacao" TEXT,

    CONSTRAINT "contas_a_pagar_pkey" PRIMARY KEY ("id")
);
