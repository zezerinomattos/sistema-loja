-- AlterTable
ALTER TABLE "colaboradores" ALTER COLUMN "data_admissao" DROP NOT NULL,
ALTER COLUMN "data_admissao" SET DEFAULT CURRENT_TIMESTAMP;
