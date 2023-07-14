/*
  Warnings:

  - You are about to drop the column `content` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `departureDate` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `crewChief` on the `subproject` table. All the data in the column will be lost.
  - You are about to drop the column `venueAddress` on the `subproject` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `trailer` table. All the data in the column will be lost.
  - Added the required column `depth` to the `Trailer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Trailer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `asset` DROP COLUMN `content`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `departureDate`;

-- AlterTable
ALTER TABLE `subproject` DROP COLUMN `crewChief`,
    DROP COLUMN `venueAddress`;

-- AlterTable
ALTER TABLE `trailer` DROP COLUMN `length`,
    ADD COLUMN `depth` DOUBLE NOT NULL,
    ADD COLUMN `height` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `_content` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_content_AB_unique`(`A`, `B`),
    INDEX `_content_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_content` ADD CONSTRAINT `_content_A_fkey` FOREIGN KEY (`A`) REFERENCES `Asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_content` ADD CONSTRAINT `_content_B_fkey` FOREIGN KEY (`B`) REFERENCES `Asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
