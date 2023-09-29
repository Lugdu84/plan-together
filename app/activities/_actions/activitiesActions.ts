'use server';

import { getServerSession } from 'next-auth';
import { mixed, object, string, date, number } from 'yup';
import { ActivityStatus, ActivityType } from '@prisma/client';
import { Activity } from '@/interfaces/Activity';
import prisma from '@/prisma/prismadb';
import authOptions from '@/lib/auth';

const activitySchema = object({
  title: string().required(),
  location: string().required(),
  type: mixed<ActivityType>().oneOf(Object.values(ActivityType)).required(),
  date: date().default(() => new Date()),
  status: mixed<ActivityStatus>()
    .oneOf(Object.values(ActivityStatus))
    .default(() => ActivityStatus.DRAFT),
  creator_id: number().required(),
});

// eslint-disable-next-line import/prefer-default-export
export async function createActivity(activity: Activity) {
  try {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    if (!user) {
      return null;
    }

    // eslint-disable-next-line no-param-reassign
    activity.creator_id = user?.id;

    const vData = await activitySchema.validate(activity);

    return prisma.activity.create({
      data: vData,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
  // const title = formData.get('title');
  // const location = formData.get('location');
  // const type = formData.get('type');
  // const date = formData.get('date');
  //
  // const activity = formData.getAll('CreateActivity');
}
