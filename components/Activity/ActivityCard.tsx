import { ActivityType } from '@prisma/client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ActivityBadge } from '@/components/ui/activity-badge';

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
      <Card className="w-full">
        <CardHeader>
          <ActivityBadge className="max-w-fit mb-4" variant={type}>
            {type}
          </ActivityBadge>
          <p className="text-2xl font-bold">{title}</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-gray-600">{`${description?.substring(
            0,
            64,
          )}...`}</p>
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
        </CardContent>
      </Card>
    </Link>
  );
}

export default ActivityCard;
