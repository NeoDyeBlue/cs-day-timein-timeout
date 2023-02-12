import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findStudent(id) {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        timeLog: {
          select: {
            timeIn: true,
            timeOut: true,
          },
        },
      },
    });

    if (!student) {
      let studentError = new Error(
        "Student cannot be found or is not a Computer Science student"
      );
      studentError.name = "StudentError";
      throw studentError;
    }

    return student;
  } catch (error) {
    throw error;
  }
}

export async function getAtendeePercentage() {
  try {
    const studentCount = await prisma.student.count({
      select: {
        _all: true, // Count all records
      },
    });

    const logCount = await prisma.timeLog.count({
      select: {
        _all: true, // Count all records
      },
    });

    const atendeePercent = (
      (logCount?._all / studentCount?._all) *
      100
    ).toFixed(2);

    return {
      studentCount: studentCount._all,
      logCount: logCount._all,
      atendeePercent,
    };
  } catch (error) {
    throw error;
  }
}

export async function getAllStudentLogs() {
  try {
    const allLogs = await prisma.student.findMany({
      include: {
        timeLog: {
          select: {
            timeIn: true,
            timeOut: true,
          },
        },
      },
    });

    return allLogs;
  } catch (error) {
    throw error;
  }
}
