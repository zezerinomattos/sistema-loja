-- AlterTable
ALTER TABLE "colaboradores" ADD COLUMN     "bonificacao" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "adiantamento_salario" DROP NOT NULL;
