/*
  Warnings:

  - A unique constraint covering the columns `[status]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tickets_status_key" ON "tickets"("status");
