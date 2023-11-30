/*
  Warnings:

  - You are about to drop the `InputParameters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InputParameters" DROP CONSTRAINT "InputParameters_designAttributeId_fkey";

-- DropTable
DROP TABLE "InputParameters";

-- CreateTable
CREATE TABLE "InputParameter" (
    "id" TEXT NOT NULL,
    "inputType" "InputType" NOT NULL,
    "explicitValue" JSONB,
    "randomValues" JSONB,
    "minValue" DOUBLE PRECISION,
    "maxValue" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InputParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DesignAttributeToInputParameter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DesignAttributeToInputParameter_AB_unique" ON "_DesignAttributeToInputParameter"("A", "B");

-- CreateIndex
CREATE INDEX "_DesignAttributeToInputParameter_B_index" ON "_DesignAttributeToInputParameter"("B");

-- AddForeignKey
ALTER TABLE "_DesignAttributeToInputParameter" ADD CONSTRAINT "_DesignAttributeToInputParameter_A_fkey" FOREIGN KEY ("A") REFERENCES "DesignAttribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesignAttributeToInputParameter" ADD CONSTRAINT "_DesignAttributeToInputParameter_B_fkey" FOREIGN KEY ("B") REFERENCES "InputParameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
