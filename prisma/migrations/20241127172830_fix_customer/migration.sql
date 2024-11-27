/*
  Warnings:

  - You are about to drop the column `email` on the `customers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "customers_email_key";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "email";
