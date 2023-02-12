import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function logStudent(id) {
  try {
    const studentLog = await prisma.timeLog.findUnique({
      where: {
        studentId: id,
      },
    });

    if (!studentLog) {
      const newStudentLog = await prisma.timeLog.create({
        data: {
          studentId: id,
          timeIn: new Date(),
        },
      });

      return newStudentLog;
    }

    if (studentLog && studentLog.timeIn && !studentLog.timeOut) {
      const updatedStudentLog = await prisma.timeLog.update({
        where: {
          studentId: id,
        },
        data: {
          timeOut: new Date(),
        },
      });

      return updatedStudentLog;
    }

    return studentLog;
  } catch (error) {
    throw error;
  }
}
