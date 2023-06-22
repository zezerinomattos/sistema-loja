-- CreateTable
CREATE TABLE "fabricas" (
    "id" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "fabrica_id" TEXT NOT NULL,

    CONSTRAINT "fabricas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fabricas" ADD CONSTRAINT "fabricas_fabrica_id_fkey" FOREIGN KEY ("fabrica_id") REFERENCES "representantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
