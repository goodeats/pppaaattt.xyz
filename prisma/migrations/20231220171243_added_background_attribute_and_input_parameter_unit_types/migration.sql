-- AlterEnum
ALTER TYPE "AttributeType" ADD VALUE 'background';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UnitType" ADD VALUE 'none';
ALTER TYPE "UnitType" ADD VALUE 'random';
ALTER TYPE "UnitType" ADD VALUE 'palette';
ALTER TYPE "UnitType" ADD VALUE 'paletteShuffle';
ALTER TYPE "UnitType" ADD VALUE 'paletteRandom';
ALTER TYPE "UnitType" ADD VALUE 'positionPixel';
