-- CreateEnum
CREATE TYPE "AttributeType" AS ENUM ('container', 'palette', 'position', 'sideLength', 'strokeStyle', 'fillStyle', 'lineWidth', 'rotation', 'filter');

-- CreateEnum
CREATE TYPE "FilterType" AS ENUM ('blur', 'opacity');

-- CreateEnum
CREATE TYPE "InputType" AS ENUM ('explicit', 'random', 'range');

-- CreateTable
CREATE TABLE "Layer" (
    "id" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Layer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignAttribute" (
    "id" TEXT NOT NULL,
    "layerId" TEXT,
    "attributeType" "AttributeType" NOT NULL,
    "filterType" "FilterType",

    CONSTRAINT "DesignAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InputParameters" (
    "id" TEXT NOT NULL,
    "designAttributeId" TEXT NOT NULL,
    "inputType" "InputType" NOT NULL,
    "explicitValue" JSONB,
    "randomValues" JSONB,
    "minValue" DOUBLE PRECISION,
    "maxValue" DOUBLE PRECISION,

    CONSTRAINT "InputParameters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Layer_parentId_idx" ON "Layer"("parentId");

-- CreateIndex
CREATE INDEX "DesignAttribute_layerId_idx" ON "DesignAttribute"("layerId");

-- CreateIndex
CREATE INDEX "DesignAttribute_attributeType_filterType_idx" ON "DesignAttribute"("attributeType", "filterType");

-- CreateIndex
CREATE UNIQUE INDEX "InputParameters_designAttributeId_key" ON "InputParameters"("designAttributeId");

-- CreateIndex
CREATE INDEX "InputParameters_designAttributeId_idx" ON "InputParameters"("designAttributeId");

-- AddForeignKey
ALTER TABLE "Layer" ADD CONSTRAINT "Layer_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Layer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignAttribute" ADD CONSTRAINT "DesignAttribute_layerId_fkey" FOREIGN KEY ("layerId") REFERENCES "Layer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InputParameters" ADD CONSTRAINT "InputParameters_designAttributeId_fkey" FOREIGN KEY ("designAttributeId") REFERENCES "DesignAttribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
