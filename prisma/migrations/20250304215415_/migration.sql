/*
  Warnings:

  - You are about to drop the column `availability` on the `Car` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CarCategory" AS ENUM ('CITADINE', 'BERLINE', 'FOUR_BY_FOUR', 'LUXE');

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "availability",
ADD COLUMN     "category" "CarCategory";
