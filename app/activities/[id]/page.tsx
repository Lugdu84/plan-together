import prisma from '@/app/utilities/prismadb';

const metadata: {
  title: string;
} = {
  title: 'Événement',
};

async function Activity({ params }: { params: { id: string } }) {
  const activity = await prisma.activity.findUniqueOrThrow({
    where: {
      id: +params.id,
    },
    include: {
      User: true,
      Invitation: true,
    },
  });

  return (
    <main className="flex flex-col items-center w-screen h-screen pt-16 lg:px-16 xl:px-32">
      <div className="flex flex-col w-3/5 gap-16">
        <header className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-serif italic md:text-5xl mb-8">
              {activity.title}
            </h1>
            <p className="text-gray-500">{activity.type}</p>
            <p className="text-lg text-gray-700">
              {activity.User.firstname} {activity.User.lastname}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg">{activity.location}</p>
            <p className="text-lg">{activity.date.toLocaleDateString()}</p>
          </div>
        </header>
        <section>
          <h2 className="text-4xl font-serif mb-8">Description</h2>
          <article>
            <p className="text-xl prose max-w-prose">{activity.description}</p>
          </article>
        </section>
        <section>
          <h2 className="text-4xl font-serif mb-8">Personnes invitées</h2>
        </section>
      </div>
    </main>
  );
}

export default Activity;
