import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker/locale/fr';
import {
  ActivityStatus,
  ActivityType,
  InvitationStatus,
  PrismaClient,
} from '@prisma/client';
import { User } from '@/app/interfaces/User';
import { Activity } from '@/app/interfaces/Activity';

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

  const activities = [];
  for (let index = 0; index < 10; ++index) {
    activities.push(
      // eslint-disable-next-line no-await-in-loop
      await prisma.activity.create({
        data: {
          title: faker.lorem.sentence({ min: 3, max: 9 }),
          location: `${faker.location.streetAddress({
            useFullAddress: true,
          })} ${faker.location.zipCode()} ${faker.location.city()}`,
          type: getRandom(Object.values(ActivityType)) as ActivityType,
          date: faker.date.between({
            from: new Date(2023, 4, 9),
            to: new Date(2024, 0, 31),
          }),
          description: faker.lorem.paragraphs({ min: 1, max: 5 }),
          creator_id: getRandomId(users),
          status: getRandom(Object.values(ActivityStatus)) as ActivityStatus,
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
        status: getRandom(Object.values(InvitationStatus)) as InvitationStatus,
        activity_id: getRandomId(activities as Activity[]),
        user_id: getRandomId(users as User[]),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }
}

function getRandomId(obj: User[] | Activity[]) {
  const randomIndex = Math.floor(Math.random() * obj.length);
  return obj[randomIndex].id;
}

function getRandom(
  obj: InvitationStatus[] | ActivityStatus[] | ActivityType[],
) {
  const randomIndex = Math.floor(Math.random() * obj.length);
  return obj[randomIndex];
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
