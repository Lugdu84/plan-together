import * as Yup from 'yup';
import { ActivityStatus, ActivityType } from '@prisma/client';

const ActivitySchema = Yup.object({
  title: Yup.string().required(),
  location: Yup.string().required(),
  type: Yup.mixed<ActivityType>().oneOf(Object.values(ActivityType)).required(),
  date: Yup.date().default(() => new Date()),
  status: Yup.mixed<ActivityStatus>()
    .oneOf(Object.values(ActivityStatus))
    .default(() => ActivityStatus.DRAFT),
  creator_id: Yup.number().required(),
});

export default ActivitySchema;
