/*
  Warnings:

  - You are about to drop the column `assetId` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `assetId` on the `rotation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Position` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Rotation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `position` DROP FOREIGN KEY `Position_assetId_fkey`;

-- DropForeignKey
ALTER TABLE `rotation` DROP FOREIGN KEY `Rotation_assetId_fkey`;

-- AlterTable
ALTER TABLE `position` DROP COLUMN `assetId`;

-- AlterTable
ALTER TABLE `rotation` DROP COLUMN `assetId`;

-- CreateIndex
CREATE UNIQUE INDEX `Position_id_key` ON `Position`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Rotation_id_key` ON `Rotation`(`id`);

-- AddForeignKey
ALTER TABLE `Position` ADD CONSTRAINT `Position_id_fkey` FOREIGN KEY (`id`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rotation` ADD CONSTRAINT `Rotation_id_fkey` FOREIGN KEY (`id`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
