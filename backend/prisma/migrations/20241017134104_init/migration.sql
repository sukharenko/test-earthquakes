-- CreateTable
CREATE TABLE `earthquakes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` CHAR(255) NOT NULL,
    `magnitude` FLOAT NOT NULL DEFAULT 0,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
