-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `type` ENUM('IMAGE', 'PDF') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Portfolio` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `heroTitle` VARCHAR(191) NULL,
    `heroSubtitle` VARCHAR(191) NULL,
    `heroDescription` TEXT NULL,
    `aboutTitle` VARCHAR(191) NULL,
    `aboutDescription` LONGTEXT NULL,
    `resumeId` VARCHAR(191) NULL,
    `github` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `x` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `footerText` TEXT NULL,
    `metaTitle` VARCHAR(191) NULL,
    `metaDescription` TEXT NULL,
    `keywords` VARCHAR(191) NULL,
    `profileImageId` VARCHAR(191) NULL,
    `workspaceImageId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Portfolio_profileImageId_idx`(`profileImageId`),
    INDEX `Portfolio_workspaceImageId_idx`(`workspaceImageId`),
    INDEX `Portfolio_resumeId_idx`(`resumeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `category` ENUM('FULL_STACK', 'FRONTEND', 'BACKEND', 'ACADEMIC', 'PERSONAL') NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('LIVE', 'IN_DEVELOPMENT', 'ARCHIVED') NOT NULL,
    `shortDescription` TEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `githubUrl` VARCHAR(191) NULL,
    `liveUrl` VARCHAR(191) NULL,
    `thumbnailId` VARCHAR(191) NULL,
    `features` JSON NULL,
    `challenges` JSON NULL,
    `learnings` JSON NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Project_slug_key`(`slug`),
    INDEX `Project_category_idx`(`category`),
    INDEX `Project_featured_idx`(`featured`),
    INDEX `Project_status_idx`(`status`),
    INDEX `Project_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Technology` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `iconName` VARCHAR(191) NULL,

    UNIQUE INDEX `Technology_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectTechnology` (
    `projectId` VARCHAR(191) NOT NULL,
    `technologyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`projectId`, `technologyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectImage` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `mediaId` VARCHAR(191) NOT NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,

    INDEX `ProjectImage_projectId_idx`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Education` (
    `id` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `field` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `cgpa` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Internship` (
    `id` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `employmentType` ENUM('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE') NOT NULL,
    `location` VARCHAR(191) NULL,
    `description` LONGTEXT NULL,
    `companyWebsite` VARCHAR(191) NULL,
    `logoId` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Internship_logoId_idx`(`logoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certification` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `issuer` VARCHAR(191) NOT NULL,
    `credentialId` VARCHAR(191) NULL,
    `credentialUrl` VARCHAR(191) NULL,
    `verificationUrl` VARCHAR(191) NULL,
    `issueDate` DATETIME(3) NULL,
    `certificateImageId` VARCHAR(191) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Certification_certificateImageId_idx`(`certificateImageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` ENUM('FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'LANGUAGE', 'TOOL') NOT NULL,
    `iconName` VARCHAR(191) NULL,
    `proficiency` INTEGER NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Achievement` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,
    `imageId` VARCHAR(191) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactMessage` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NULL,
    `message` LONGTEXT NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ContactMessage_isRead_idx`(`isRead`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_resumeId_fkey` FOREIGN KEY (`resumeId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_profileImageId_fkey` FOREIGN KEY (`profileImageId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_workspaceImageId_fkey` FOREIGN KEY (`workspaceImageId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTechnology` ADD CONSTRAINT `ProjectTechnology_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTechnology` ADD CONSTRAINT `ProjectTechnology_technologyId_fkey` FOREIGN KEY (`technologyId`) REFERENCES `Technology`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectImage` ADD CONSTRAINT `ProjectImage_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectImage` ADD CONSTRAINT `ProjectImage_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Internship` ADD CONSTRAINT `Internship_logoId_fkey` FOREIGN KEY (`logoId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certification` ADD CONSTRAINT `Certification_certificateImageId_fkey` FOREIGN KEY (`certificateImageId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Achievement` ADD CONSTRAINT `Achievement_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
