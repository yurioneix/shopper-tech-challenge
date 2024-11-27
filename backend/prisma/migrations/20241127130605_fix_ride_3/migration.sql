/*
  Warnings:

  - The primary key for the `rides` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "rides" DROP CONSTRAINT "rides_pkey",
ALTER COLUMN "customerId" DROP DEFAULT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "rides_pkey" PRIMARY KEY ("customerId");
DROP SEQUENCE "rides_customerId_seq";
