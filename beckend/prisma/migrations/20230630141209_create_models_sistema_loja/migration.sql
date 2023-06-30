/*
  Warnings:

  - Added the required column `status` to the `registrocaixas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registrocaixas" ADD COLUMN     "status" BOOLEAN NOT NULL;
