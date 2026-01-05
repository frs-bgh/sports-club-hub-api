const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.member.deleteMany();
  await prisma.newsPost.deleteMany();

  await prisma.member.createMany({
    data: [
      { firstName: "Fariss", lastName: "Student", age: 22, membershipNumber: 1001 },
      { firstName: "Ahmed", lastName: "Buddy", age: 23, membershipNumber: 1002 },
      { firstName: "Sara", lastName: "Runner", age: 21, membershipNumber: 1003 }
    ],
  });

  await prisma.newsPost.createMany({
    data: [
      { title: "New training schedule", content: "We added extra sessions on friday.", views: 5 },
      { title: "Club event", content: "Small event next week for members.", views: 2 }
    ],
  });
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