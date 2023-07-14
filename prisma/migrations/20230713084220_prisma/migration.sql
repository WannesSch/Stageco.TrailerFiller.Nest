-- DropForeignKey
ALTER TABLE `asset` DROP FOREIGN KEY `Asset_subprojectId_fkey`;

-- DropForeignKey
ALTER TABLE `subproject` DROP FOREIGN KEY `Subproject_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `trailer` DROP FOREIGN KEY `Trailer_subprojectId_fkey`;

-- AlterTable
ALTER TABLE `asset` MODIFY `subprojectId` INTEGER NULL;

-- AlterTable
ALTER TABLE `subproject` MODIFY `projectId` INTEGER NULL;

-- AlterTable
ALTER TABLE `trailer` MODIFY `subprojectId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_subprojectId_fkey` FOREIGN KEY (`subprojectId`) REFERENCES `Subproject`(`subprojectId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subproject` ADD CONSTRAINT `Subproject_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trailer` ADD CONSTRAINT `Trailer_subprojectId_fkey` FOREIGN KEY (`subprojectId`) REFERENCES `Subproject`(`subprojectId`) ON DELETE SET NULL ON UPDATE CASCADE;
