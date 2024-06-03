/*
  Warnings:

  - A unique constraint covering the columns `[classroom]` on the table `classrooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "classrooms_classroom_key" ON "classrooms"("classroom");
