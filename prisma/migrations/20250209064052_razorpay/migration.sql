/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_userId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "updatedAt",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paymentId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "purchasedAt" DROP NOT NULL,
ALTER COLUMN "purchasedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
