-- DropForeignKey
ALTER TABLE `position` DROP FOREIGN KEY `Position_assetId_fkey`;

-- DropForeignKey
ALTER TABLE `rotation` DROP FOREIGN KEY `Rotation_assetId_fkey`;

-- AlterTable
ALTER TABLE `position` MODIFY `assetId` INTEGER NULL;

-- AlterTable
ALTER TABLE `rotation` MODIFY `assetId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Position` ADD CONSTRAINT `Position_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rotation` ADD CONSTRAINT `Rotation_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
