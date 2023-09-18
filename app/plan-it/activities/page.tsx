import { PrismaClient } from '@prisma/client';
import ActivityCard from '@/app/components/ActivityCard';

const prisma = new PrismaClient();

const metadata: {
  title: string;
} = {
  title: 'Activités',
};

async function Activities() {
  const activities = await prisma.activity.findMany({
    orderBy: {
      date: 'desc',
    },
  });

  return (
    <section>
      <main className="flex flex-col p-16 gap-8">
        <h1 className="font-serif italic text-7xl mb-8">{metadata.title}</h1>
        {activities.map((activity) => (
          <ActivityCard
            title={activity.title}
            type={activity.type}
            description={activity.description}
            location={activity.location}
            date={activity.date}
          />
        ))}
      </main>
    </section>
  );
}

export default Activities;
