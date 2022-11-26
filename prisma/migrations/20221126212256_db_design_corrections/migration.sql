/*
  Warnings:

  - You are about to drop the column `userId` on the `tickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `responsible` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_userId_fkey";

-- DropIndex
DROP INDEX "locations_companyId_key";

-- DropIndex
DROP INDEX "responsible_companyId_key";

-- DropIndex
DROP INDEX "responsible_locationId_key";

-- DropIndex
DROP INDEX "responsible_name_key";

-- DropIndex
DROP INDEX "tickets_locationId_key";

-- DropIndex
DROP INDEX "tickets_userId_key";

-- AlterTable
ALTER TABLE "responsible" ALTER COLUMN "isIncharge" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "userId",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "updateById" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "responsible_phone_key" ON "responsible"("phone");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
