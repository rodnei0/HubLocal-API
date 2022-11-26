/*
  Warnings:

  - You are about to drop the column `adressId` on the `responsible` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `responsible` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "responsible" DROP CONSTRAINT "responsible_adressId_fkey";

-- AlterTable
ALTER TABLE "responsible" DROP COLUMN "adressId",
ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
