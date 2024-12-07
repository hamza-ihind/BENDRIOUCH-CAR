/*
  Warnings:

  - You are about to drop the column `driverLicense` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the column `passportNumber` on the `reservations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "driverLicense",
DROP COLUMN "passportNumber";
