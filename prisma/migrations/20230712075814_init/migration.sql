-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `height` DOUBLE NOT NULL,
    `width` DOUBLE NOT NULL,
    `depth` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `modelPath` VARCHAR(191) NULL,
    `position` JSON NOT NULL,
    `rotation` JSON NOT NULL,
    `projectId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `projectId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `venueAddress` VARCHAR(191) NULL,
    `crewChief` VARCHAR(191) NULL,
    `departureDate` VARCHAR(191) NULL,
    `createdAt` VARCHAR(191) NULL,
    `updatedAt` VARCHAR(191) NULL,

    PRIMARY KEY (`projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trailer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `width` DOUBLE NOT NULL,
    `length` DOUBLE NOT NULL,
    `maxHeight` DOUBLE NOT NULL,
    `weight` DOUBLE NULL,
    `maxWeight` DOUBLE NOT NULL,
    `projectId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`projectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_id_fkey` FOREIGN KEY (`id`) REFERENCES `Trailer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trailer` ADD CONSTRAINT `Trailer_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`projectId`) ON DELETE RESTRICT ON UPDATE CASCADE;
