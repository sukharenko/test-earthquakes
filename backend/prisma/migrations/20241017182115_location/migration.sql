/*
  Warnings:

  - You are about to drop the column `location` on the `earthquakes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `earthquakes` DROP COLUMN `location`,
    ADD COLUMN `lat` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `lng` FLOAT NOT NULL DEFAULT 0;
