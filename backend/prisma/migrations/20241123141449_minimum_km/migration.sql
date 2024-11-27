/*
  Warnings:

  - Added the required column `minimumKm` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "minimumKm" INTEGER NOT NULL,
ALTER COLUMN "review" SET DATA TYPE TEXT;
