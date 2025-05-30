const { PrismaClient } = require('@prisma/client');
 const prisma = new PrismaClient();
 async function main() {
  // タスクデータの作成
  function parseYMDWithSlash(str) {
  const [year, month, day] = str.split('/').map(Number);
  return new Date(year, month - 1, day);
  }
  const userCount = await prisma.users.count();
  if(userCount === 0) {
    await prisma.users.createMany({
      data: [
        { name: "私", birthday: parseYMDWithSlash("2004/9/8"),leftDate: new Date(),days_left: 50,},
        { name: "あなた", birthday: parseYMDWithSlash("2004/9/8"),leftDate: new Date(),days_left: 100,}
      ],
    });
  }
 }
 main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })