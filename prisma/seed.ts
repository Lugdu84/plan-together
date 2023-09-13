import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { EventStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('LeSuperMotDePasse', 10);

    /*await prisma.user.delete({ where: { email } }).catch(() => {

    })*/

    const users = []
    for (let index = 0; index < 24; ++index) {

      
    users.push(await prisma.user.create({
        
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
        }))
    }
    console.log(users);
    


    for (let index = 0; index < 10; ++index) {
      await prisma.event.create({
        data: {
          title: faker.lorem.sentence(5),
          location: 'TU ME GAVES RUE ST LOUIS 33100 MONTREUIL',
          type: 'ONLINE',
          event_date: new Date(),
          creator_id: getRandomUserId(users),
          status: EventStatus.CANCELED,
          created_at: new Date(),
          updated_at: new Date()
        },
      })
    }
}

function getRandomUserId(users: any) {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex].id;
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