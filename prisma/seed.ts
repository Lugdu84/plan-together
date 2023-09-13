import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('LeSuperMotDePasse', 10);

    /*await prisma.user.delete({ where: { email } }).catch(() => {

    })*/

    for (let index = 0; index < 24; ++index) {
      await prisma.user.create({
        data: {
          firstname: faker.person.firstName(),
          lastname: faker.person.lastName(),
          email: faker.internet.email(),
          password: hashedPassword,
          sign_up_date: faker.date.between({
            from: new Date("05/05/2023"),
            to: Date.now()
          }),
        },
      })
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Base de donnée peuplée d'utilisateurs");
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })