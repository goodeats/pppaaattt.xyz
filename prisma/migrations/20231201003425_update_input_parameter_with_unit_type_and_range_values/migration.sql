/*
  Warnings:

  - You are about to drop the column `explicitValue` on the `InputParameter` table. All the data in the column will be lost.
  - You are about to drop the column `maxValue` on the `InputParameter` table. All the data in the column will be lost.
  - You are about to drop the column `minValue` on the `InputParameter` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('px', 'percent');

-- AlterTable
ALTER TABLE "InputParameter" DROP COLUMN "explicitValue",
DROP COLUMN "maxValue",
DROP COLUMN "minValue",
ADD COLUMN     "explicitValues" JSONB,
ADD COLUMN     "rangeValues" JSONB,
ADD COLUMN     "unitType" "UnitType" NOT NULL DEFAULT 'px';
