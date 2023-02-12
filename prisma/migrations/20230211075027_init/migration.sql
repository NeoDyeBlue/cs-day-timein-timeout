-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT,
    "lastName" TEXT,
    "year" INTEGER NOT NULL,
    "section" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TimeLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" TEXT NOT NULL,
    "timeIn" DATETIME,
    "timeOut" DATETIME,
    CONSTRAINT "TimeLog_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeLog_studentId_key" ON "TimeLog"("studentId");
