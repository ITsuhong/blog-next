/*
  Warnings:

  - Added the required column `bg_img` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tag` ADD COLUMN `bg_img` VARCHAR(191) NOT NULL;
