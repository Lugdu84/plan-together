'use server';

import { getServerSession } from 'next-auth';
import * as Yup from 'yup';
import { ActivityStatus, ActivityType } from '@prisma/client';
import prisma from '@/prisma/prismadb';
import authOptions from '@/lib/auth';
import { Activity } from '@/interfaces/Activity';

const activitySchema = Yup.object({
  title: Yup.string().required(),
  location: Yup.string().required(),
  type: Yup.mixed<ActivityType>().oneOf(Object.values(ActivityType)).required(),
  date: Yup.date().default(() => new Date()),
  status: Yup.mixed<ActivityStatus>()
    .oneOf(Object.values(ActivityStatus))
    .default(() => ActivityStatus.DRAFT),
  creator_id: Yup.number().required(),
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
    console.error(err);
    return err;
  }

  // const title = formData.get('title');
  // const location = formData.get('location');
  // const type = formData.get('type');
  // const date = formData.get('date');
  //
  // const activity = formData.getAll('CreateActivity');
}
