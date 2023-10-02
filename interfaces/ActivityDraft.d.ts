import { Activity } from '@/interfaces/Activity';

type ActivityDraft = Pick<
  Activity,
  'title' | 'location' | 'type' | 'date' | 'picture' | 'description' | 'status'
>;

export default ActivityDraft;
