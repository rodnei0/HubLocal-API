-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_companyId_fkey";

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
