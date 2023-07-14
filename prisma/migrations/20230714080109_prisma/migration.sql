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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `venueAddress` VARCHAR(191) NULL,
    `crewChief` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
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
    `subprojectId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `departureDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,
    `projectId` INTEGER NULL,

    PRIMARY KEY (`subprojectId`)
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
CREATE TABLE `_content` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_content_AB_unique`(`A`, `B`),
    INDEX `_content_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_subprojectId_fkey` FOREIGN KEY (`subprojectId`) REFERENCES `Subproject`(`subprojectId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_trailerId_fkey` FOREIGN KEY (`trailerId`) REFERENCES `Trailer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subproject` ADD CONSTRAINT `Subproject_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trailer` ADD CONSTRAINT `Trailer_subprojectId_fkey` FOREIGN KEY (`subprojectId`) REFERENCES `Subproject`(`subprojectId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_content` ADD CONSTRAINT `_content_A_fkey` FOREIGN KEY (`A`) REFERENCES `Asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_content` ADD CONSTRAINT `_content_B_fkey` FOREIGN KEY (`B`) REFERENCES `Asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
