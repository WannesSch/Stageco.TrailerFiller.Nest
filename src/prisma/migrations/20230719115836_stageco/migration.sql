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
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `venueAddress` VARCHAR(191) NULL,
    `crewChief` VARCHAR(191) NULL,
    `createdAt` VARCHAR(191) NULL,
    `updatedAt` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` INTEGER NULL,
    `height` DOUBLE NOT NULL,
    `width` DOUBLE NOT NULL,
    `depth` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `modelPath` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `rotation` VARCHAR(191) NULL,
    `subprojectId` INTEGER NULL,
    `trailerId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subproject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `crewChief` VARCHAR(191) NULL,
    `departureDate` VARCHAR(191) NULL,
    `createdAt` VARCHAR(191) NULL,
    `updatedAt` VARCHAR(191) NULL,
    `projectId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trailer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `width` DOUBLE NOT NULL,
    `depth` DOUBLE NOT NULL,
    `height` DOUBLE NOT NULL,
    `weight` DOUBLE NULL,
    `maxWeight` DOUBLE NOT NULL,
    `subprojectId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NULL,
    `boxId` INTEGER NULL,
    `weight` DOUBLE NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_subprojectId_fkey` FOREIGN KEY (`subprojectId`) REFERENCES `Subproject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_trailerId_fkey` FOREIGN KEY (`trailerId`) REFERENCES `Trailer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subproject` ADD CONSTRAINT `Subproject_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trailer` ADD CONSTRAINT `Trailer_subprojectId_fkey` FOREIGN KEY (`subprojectId`) REFERENCES `Subproject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_boxId_fkey` FOREIGN KEY (`boxId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
