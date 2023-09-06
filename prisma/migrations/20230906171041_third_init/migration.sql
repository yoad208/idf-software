/*
  Warnings:

  - You are about to drop the column `end_line_DOWN` on the `Govs` table. All the data in the column will be lost.
  - You are about to drop the column `end_line_UP` on the `Govs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Govs" DROP COLUMN "end_line_DOWN",
DROP COLUMN "end_line_UP";
