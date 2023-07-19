/*
  Warnings:

  - The primary key for the `subproject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subprojectId` on the `subproject` table. All the data in the column will be lost.
  - Added the required column `id` to the `Subproject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `asset` DROP FOREIGN KEY `Asset_subprojectId_fkey`;

-- DropForeignKey
ALTER TABLE `trailer` DROP FOREIGN KEY `Trailer_subprojectId_fkey`;

-- AlterTable
ALTER TABLE `subproject` DROP PRIMARY KEY,
    DROP COLUMN `subprojectId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_subprojectId_fkey` FOREIGN KEY (`subprojectId`) REFERENCES `Subproject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trailer` ADD CONSTRAINT `Trailer_subprojectId_fkey` FOREIGN KEY (`subprojectId`) REFERENCES `Subproject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
