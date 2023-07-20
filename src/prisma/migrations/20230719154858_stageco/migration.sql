/*
  Warnings:

  - You are about to drop the column `position` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `rotation` on the `asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `asset` DROP COLUMN `position`,
    DROP COLUMN `rotation`;

-- CreateTable
CREATE TABLE `Postition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `x` DOUBLE NOT NULL,
    `y` DOUBLE NOT NULL,
    `z` DOUBLE NOT NULL,
    `assetId` INTEGER NULL,

    UNIQUE INDEX `Postition_assetId_key`(`assetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rotation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `x` DOUBLE NOT NULL,
    `y` DOUBLE NOT NULL,
    `z` DOUBLE NOT NULL,
    `assetId` INTEGER NULL,

    UNIQUE INDEX `Rotation_assetId_key`(`assetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Postition` ADD CONSTRAINT `Postition_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rotation` ADD CONSTRAINT `Rotation_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
