/*
  Warnings:

  - You are about to drop the column `userId` on the `FormResponse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."FormResponse" DROP CONSTRAINT "FormResponse_userId_fkey";

-- AlterTable
ALTER TABLE "FormResponse" DROP COLUMN "userId";
