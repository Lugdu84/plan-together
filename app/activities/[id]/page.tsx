import { InvitationStatus } from '@prisma/client';
import { faMapLocation, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import prisma from '@/prisma/prismadb';
import { Button } from '@/components/Button/button';

async function Activity({ params }: { params: { id: string } }) {
  const activity = await prisma.activity.findUniqueOrThrow({
    where: {
      id: +params.id,
    },
    include: {
      Invitation: {
        include: {
          User: true,
        },
      },
      User: true,
    },
  });

  return (
    <main className="flex flex-col items-center w-screen py-32 lg:px-16 xl:px-32">
      <div className="flex flex-col w-3/5 gap-16 max-w-3xl">
        <header className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="inline-flex max-w-fit font-bold py-0.5 px-2 rounded-md text-neutral-800 bg-neutral-300 mb-4">
              {activity.type}
            </span>
            <h1 className="text-2xl font-serif italic md:text-5xl mb-4">
              {activity.title}
            </h1>
            <p className="text-lg text-gray-700">
              {activity.User.firstname} {activity.User.lastname}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg flex gap-4 items-center">
              <FontAwesomeIcon className="inline-flex" icon={faMapLocation} />
              <span className="inline-flex">{activity.location}</span>
            </p>
            <p className="text-lg flex gap-4 items-center">
              <FontAwesomeIcon className="inline-flex" icon={faCalendarAlt} />
              <span className="inline-flex">
                {activity.date.toLocaleDateString()}
              </span>
            </p>
          </div>
        </header>
        <section>
          <h2 className="text-4xl font-serif mb-8">Description</h2>
          <article>
            <p className="text-xl prose max-w-prose">{activity.description}</p>
          </article>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-4xl font-serif mb-8">Personnes invitées</h2>
          {activity.Invitation.map((invitation) => (
            <p className="flex justify-between w-1/2">
              <span
                className={
                  invitation.status === InvitationStatus.EXPIRED
                    ? 'inline text-lg font-medium text-gray-400'
                    : 'inline text-lg font-medium'
                }
              >
                {invitation.User.firstname} {invitation.User.lastname}
              </span>
              {invitation.status === InvitationStatus.VALIDATED ? (
                <span className="inline font-bold py-0.5 px-2 rounded-md text-emerald-800 bg-emerald-100">
                  Présent-e
                </span>
              ) : (
                ''
              )}
              {invitation.status === InvitationStatus.PENDING ? (
                <span className="inline py-0.5 px-2 rounded-md text-amber-700 bg-amber-100">
                  En attente
                </span>
              ) : (
                ''
              )}
              {invitation.status === InvitationStatus.REFUSED ? (
                <span className="inline py-0.5 px-2 rounded-md text-red-700 bg-red-100">
                  Absent-e
                </span>
              ) : (
                ''
              )}
              {invitation.status === InvitationStatus.EXPIRED ? (
                <span className="inline py-0.5 px-2 rounded-md text-gray-400 bg-gray-200">
                  Expiré
                </span>
              ) : (
                ''
              )}
            </p>
          )).sort()}
          <div className="flex self-end max-w-lg">
            <Button content="Inviter" buttonType="primary" icon={faPlus} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Activity;
