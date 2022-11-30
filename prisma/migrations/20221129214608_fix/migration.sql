/*
  Warnings:

  - You are about to drop the column `creation_date` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `update_date` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `creationDate` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateDate` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "creation_date",
DROP COLUMN "update_date",
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updateDate" TIMESTAMP(3) NOT NULL;
