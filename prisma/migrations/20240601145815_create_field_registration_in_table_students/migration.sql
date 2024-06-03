/*
  Warnings:

  - You are about to drop the column `code` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registration]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registration` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "code",
ADD COLUMN     "registration" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_registration_key" ON "students"("registration");
