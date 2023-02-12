const { readFile, utils } = require("xlsx");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const workbook = readFile("./excel/bscs-org-students.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[5]];
const students = utils.sheet_to_json(sheet);

async function main() {
  for (const student of students) {
    await prisma.student.upsert({
      where: { id: student.id },
      update: {},
      create: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        year: student.year,
        section: student.section,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
