import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker/locale/fr';
import {
  EventStatus,
  EventType,
  InvitationStatus,
  PrismaClient,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash(
    faker.internet.password({ length: 20, memorable: true }),
    10,
  );

  const users = [];
  for (let index = 0; index < 24; ++index) {
    const fakeFirstName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();
    users.push(
      // eslint-disable-next-line no-await-in-loop
      await prisma.user.create({
        data: {
          firstname: fakeFirstName,
          lastname: fakeLastName,
          email: `${fakeFirstName.toLowerCase()}.${fakeLastName.toLowerCase()}@${faker.internet.domainName()}`,
          password: hashedPassword,
          sign_up_date: faker.date.between({
            from: new Date(2023, 4, 9),
            to: Date.now(),
          }),
        },
      }),
    );
  }

  const events = [];
  for (let index = 0; index < 10; ++index) {
    events.push(
      // eslint-disable-next-line no-await-in-loop
      await prisma.event.create({
        data: {
          title: faker.lorem.sentence({ min: 3, max: 9 }),
          location: `${faker.location.streetAddress({
            useFullAddress: true,
          })} ${faker.location.zipCode()} ${faker.location.city()}`,
          type: getRandom(Object.values(EventType), false),
          event_date: faker.date.between({
            from: new Date(2023, 4, 9),
            to: new Date(2024, 0, 31),
          }),
          creator_id: getRandom(users, true),
          status: getRandom(Object.values(EventStatus), false),
          created_at: new Date(),
          updated_at: new Date(),
        },
      }),
    );
  }

  for (let index = 0; index < 30; ++index) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.invitation.create({
      data: {
        token: faker.string.alphanumeric({
          length: {
            min: 22,
            max: 31,
          },
        }),
        status: getRandom(Object.values(InvitationStatus), false),
        event_id: getRandom(events, true),
        user_id: getRandom(users, true),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }
}

function getRandom(obj: any, hasId: boolean) {
  const randomIndex = Math.floor(Math.random() * obj.length);
  if (hasId) {
    return obj[randomIndex].id;
  }
  return obj[randomIndex];
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
