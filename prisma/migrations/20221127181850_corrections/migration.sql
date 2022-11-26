/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `responsible` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `responsible` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "responsible_phone_key";

-- AlterTable
ALTER TABLE "responsible" ADD COLUMN     "cpf" TEXT NOT NULL,
ALTER COLUMN "isIncharge" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "responsible_cpf_key" ON "responsible"("cpf");
