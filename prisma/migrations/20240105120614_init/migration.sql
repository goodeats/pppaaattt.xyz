/*
  Warnings:

  - The values [sideLength] on the enum `AttributeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttributeType_new" AS ENUM ('container', 'palette', 'background', 'position', 'size', 'strokeStyle', 'fillStyle', 'lineWidth', 'rotation', 'filter');
ALTER TABLE "DesignAttribute" ALTER COLUMN "attributeType" TYPE "AttributeType_new" USING ("attributeType"::text::"AttributeType_new");
ALTER TYPE "AttributeType" RENAME TO "AttributeType_old";
ALTER TYPE "AttributeType_new" RENAME TO "AttributeType";
DROP TYPE "AttributeType_old";
COMMIT;
