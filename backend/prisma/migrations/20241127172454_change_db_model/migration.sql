/*
  Warnings:

  - The primary key for the `rides` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `driver` on the `rides` table. All the data in the column will be lost.
  - Added the required column `driverId` to the `rides` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `customerId` on the `rides` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "rides" DROP CONSTRAINT "rides_pkey",
DROP COLUMN "driver",
ADD COLUMN     "driverId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "customerId",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD CONSTRAINT "rides_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
