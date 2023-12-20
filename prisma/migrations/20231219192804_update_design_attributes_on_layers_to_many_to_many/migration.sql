/*
  Warnings:

  - You are about to drop the column `layerId` on the `DesignAttribute` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DesignAttribute" DROP CONSTRAINT "DesignAttribute_layerId_fkey";

-- DropIndex
DROP INDEX "DesignAttribute_layerId_idx";

-- AlterTable
ALTER TABLE "DesignAttribute" DROP COLUMN "layerId";

-- CreateTable
CREATE TABLE "DesignAttributesOnLayers" (
    "layerId" TEXT NOT NULL,
    "designAttributeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesignAttributesOnLayers_pkey" PRIMARY KEY ("layerId","designAttributeId")
);

-- AddForeignKey
ALTER TABLE "DesignAttributesOnLayers" ADD CONSTRAINT "DesignAttributesOnLayers_layerId_fkey" FOREIGN KEY ("layerId") REFERENCES "Layer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignAttributesOnLayers" ADD CONSTRAINT "DesignAttributesOnLayers_designAttributeId_fkey" FOREIGN KEY ("designAttributeId") REFERENCES "DesignAttribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
