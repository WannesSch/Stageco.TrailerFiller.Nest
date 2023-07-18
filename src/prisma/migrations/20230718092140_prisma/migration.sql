/*
  Warnings:

  - You are about to drop the column `bakId` on the `content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `Content_bakId_fkey`;

-- AlterTable
ALTER TABLE `content` DROP COLUMN `bakId`,
    ADD COLUMN `boxId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_boxId_fkey` FOREIGN KEY (`boxId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
