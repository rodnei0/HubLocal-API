/*
  Warnings:

  - A unique constraint covering the columns `[zipcode]` on the table `Addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Addresses_zipcode_key" ON "Addresses"("zipcode");
