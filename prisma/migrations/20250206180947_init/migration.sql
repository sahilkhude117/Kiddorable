-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'REFUNDED';

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Purchase_productId_idx" ON "Purchase"("productId");
