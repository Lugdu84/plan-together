import ActivityCard from '@/components/Activity/ActivityCard';
import prisma from '@/app/utilities/prismadb';

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
            id={activity.id}
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
