/*
  Warnings:

  - Added the required column `username` to the `echo_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "echo_log" ADD COLUMN     "username" TEXT NOT NULL;
