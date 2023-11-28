/*
  Warnings:

  - Added the required column `title` to the `Layer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Layer" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
