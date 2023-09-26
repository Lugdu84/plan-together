'use server';

import { Activity } from '@/interfaces/Activity';

// eslint-disable-next-line import/prefer-default-export
export async function createActivity(activity: Activity) {
  return activity.title;
  // const title = formData.get('title');
  // const location = formData.get('location');
  // const type = formData.get('type');
  // const date = formData.get('date');
  //
  // const activity = formData.getAll('CreateActivity');
}
