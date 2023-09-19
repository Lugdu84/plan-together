import { ActivityType } from '@prisma/client';
import Link from 'next/link';

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
      <div className="flex flex-col bg-gray-200 gap-4 p-8 border rounded-lg w-full">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-gray-700">{type.toLowerCase()}</p>
        </div>
        <p className="text-gray-600">{`${description?.substring(0, 64)}...`}</p>
        <div className="flex gap-8">
          <p className="text-gray-700">{`${location.substring(0, 24)}...`}</p>
          <p className="text-gray-500">{date.toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  );
}

export default ActivityCard;
