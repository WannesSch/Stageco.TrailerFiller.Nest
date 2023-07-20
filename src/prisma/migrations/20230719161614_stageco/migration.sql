/*
  Warnings:

  - Made the column `assetId` on table `position` required. This step will fail if there are existing NULL values in that column.
  - Made the column `assetId` on table `rotation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `position` DROP FOREIGN KEY `Position_assetId_fkey`;

-- DropForeignKey
ALTER TABLE `rotation` DROP FOREIGN KEY `Rotation_assetId_fkey`;

-- AlterTable
ALTER TABLE `position` MODIFY `assetId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rotation` MODIFY `assetId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Position` ADD CONSTRAINT `Position_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rotation` ADD CONSTRAINT `Rotation_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
