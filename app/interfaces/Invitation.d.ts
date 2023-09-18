import { InvitationStatus } from '@prisma/client';
import { User } from './User';
import { Activity } from '@/app/interfaces/Activity';

export interface Invitation {
  id: number;
  token: string;
  status: InvitationStatus;
  activity_id: number;
  user_id: number;
  Activity: Activity;
  User: User;
  created_at: Date;
  updated_at: Date;
}
