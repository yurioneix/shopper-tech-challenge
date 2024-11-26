/*
  Warnings:

  - You are about to drop the `Ride` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Ride";

-- CreateTable
CREATE TABLE "rides" (
    "customerId" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "driver" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "rides_pkey" PRIMARY KEY ("customerId")
);
