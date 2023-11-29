/*
  Warnings:

  - Added the required column `updatedAt` to the `DesignAttribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InputParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Layer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DesignAttribute" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "InputParameters" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Layer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
