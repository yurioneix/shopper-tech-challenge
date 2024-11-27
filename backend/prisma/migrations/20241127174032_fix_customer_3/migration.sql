/*
  Warnings:

  - Added the required column `date` to the `rides` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rides" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
