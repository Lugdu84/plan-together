'use server';

import { getServerSession } from 'next-auth';
import * as Yup from 'yup';
import { ActivityStatus, ActivityType } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
import prisma from '@/prisma/prismadb';
import authOptions from '@/lib/auth';
import ActivityDraft from '@/interfaces/ActivityDraft';

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

// eslint-disable-next-line import/prefer-default-export, consistent-return
export async function createActivity(activity: ActivityDraft) {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  if (!user) {
    return 'user_not_found';
  }
  // eslint-disable-next-line no-param-reassign
  activity.date = dayjs(activity.date).toDate();
  const activityToCreate = { ...activity, creator_id: user.id };

  const check = await activitySchema.validate(activityToCreate);
  if (check instanceof Yup.ValidationError) {
    return 'validation_error';
  }

  try {
    await prisma.activity.create({
      data: activityToCreate,
    });
  } catch (e) {
    return 'database_insertion_error';
  }
}
