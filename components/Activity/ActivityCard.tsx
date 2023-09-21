import { ActivityType } from '@prisma/client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';

function ActivityCard(prop: {
  id: number;
  title: string;
  type: ActivityType;
  description: string | null;
  location: string;
  date: Date;
}) {
  const { id, type, description, date, title, location } = prop;

  return (
    <Link href={`/activities/${id}`} className="flex w-full max-w-4xl">
      <div className="flex flex-col bg-gray-200 gap-6 p-8 border rounded-lg w-full">
        <div className="flex flex-col gap-2">
          <span className="inline-flex max-w-fit font-bold py-0.5 px-2 rounded-md text-neutral-800 bg-neutral-300 mb-4">
            {type}
          </span>
          <p className="text-2xl font-bold">{title}</p>
        </div>
        <p className="text-gray-600">{`${description?.substring(0, 64)}...`}</p>
        <div className="flex gap-8">
          <p className="text-gray-500 flex gap-4 items-center">
            <FontAwesomeIcon className="inline-flex" icon={faMapLocation} />
            <span className="inline-flex">{`${location.substring(
              0,
              24,
            )}...`}</span>
          </p>
          <p className="text-gray-500 flex gap-4 items-center">
            <FontAwesomeIcon className="inline-flex" icon={faCalendarAlt} />
            <span className="inline-flex">{date.toLocaleDateString()}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ActivityCard;
