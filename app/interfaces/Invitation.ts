import { InvitationStatus } from '@prisma/client';
import { User } from './User';

export interface Invitation {
  id: number;
  token: string;
  status: InvitationStatus;
  event_id: number;
  user_id: number;
  Event: Event;
  User: User;
  created_at: Date;
  updated_at: Date;
}
