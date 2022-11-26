/*
  Warnings:

  - You are about to drop the `Adressess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_adressId_fkey";

-- DropForeignKey
ALTER TABLE "responsible" DROP CONSTRAINT "responsible_adressId_fkey";

-- DropTable
DROP TABLE "Adressess";

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
