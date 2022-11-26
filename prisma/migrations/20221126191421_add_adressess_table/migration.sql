/*
  Warnings:

  - You are about to drop the column `address` on the `responsible` table. All the data in the column will be lost.
  - You are about to drop the column `in_charge` on the `responsible` table. All the data in the column will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adressId` to the `responsible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isIncharge` to the `responsible` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_companyId_fkey";

-- DropForeignKey
ALTER TABLE "responsible" DROP CONSTRAINT "responsible_companyId_fkey";

-- DropForeignKey
ALTER TABLE "responsible" DROP CONSTRAINT "responsible_locationId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_locationId_fkey";

-- AlterTable
ALTER TABLE "responsible" DROP COLUMN "address",
DROP COLUMN "in_charge",
ADD COLUMN     "adressId" INTEGER NOT NULL,
ADD COLUMN     "isIncharge" BOOLEAN NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL,
ALTER COLUMN "locationId" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE "tickets_id_seq";
ALTER TABLE "tickets" ALTER COLUMN "id" SET DEFAULT nextval('tickets_id_seq');
ALTER SEQUENCE "tickets_id_seq" OWNED BY "tickets"."id";

-- DropTable
DROP TABLE "company";

-- DropTable
DROP TABLE "location";

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "adressId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adressess" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,

    CONSTRAINT "Adressess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "locations_name_key" ON "locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "locations_companyId_key" ON "locations"("companyId");

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adressess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adressess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsible" ADD CONSTRAINT "responsible_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
