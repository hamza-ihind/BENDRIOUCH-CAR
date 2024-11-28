const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function seedCourses() {
  await database.category.createMany({
    data: [
      { name: "1ère Bac", type: "COURSE" },
      { name: "2ème Bac", type: "COURSE" },
      { name: "S.EX", type: "COURSE" },
      { name: "S.M", type: "COURSE" },
      { name: "P.C", type: "COURSE" },
      { name: "SVT", type: "COURSE" },
      { name: "SMA", type: "COURSE" },
      { name: "SMB", type: "COURSE" },
    ],
  });
}

async function seedBlogs() {
  await database.category.createMany({
    data: [
      { name: "Engineer", type: "BLOG" },
      { name: "Maths", type: "BLOG" },
      { name: "Physics", type: "BLOG" },
      { name: "Calculus", type: "BLOG" },
      { name: "Geometry", type: "BLOG" },
    ],
  });
}

async function main() {
  try {
    await seedCourses();
    await seedBlogs();
    console.log("Success");
  } catch (error) {
    console.error("Error seeding the database categories:", error);
  } finally {
    await database.$disconnect();
  }
}

main();
