/*
  Warnings:

  - You are about to drop the column `adressId` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `locations` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_adressId_fkey";

-- DropIndex
DROP INDEX "locations_name_key";

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "adressId",
DROP COLUMN "description",
ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
