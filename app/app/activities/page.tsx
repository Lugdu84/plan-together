import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const metadata: {
  title: string;
} = {
  title: 'Événements',
};

async function Activities(): Promise<JSX.Element> {
  const activities = await prisma.activity.findMany();

  return (
    <section>
      <main className="flex flex-col p-16">
        <h1 className="font-serif italic text-7xl mb-8">{metadata.title}</h1>
        {activities.map((activity) => (
          <div className="flex flex-col">
            <h2 className="text-3xl mb-4">{activity.title}</h2>
          </div>
        ))}
      </main>
    </section>
  );
}

export default Activities;
