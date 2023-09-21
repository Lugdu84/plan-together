import prisma from '../../../prisma/prismadb';
import ActivityCard from '@/components/Activity/ActivityCard';

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
    <main className="flex p-16 justify-center">
      <div className="flex flex-col gap-8">
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
      </div>
    </main>
  );
}

export default Activities;
