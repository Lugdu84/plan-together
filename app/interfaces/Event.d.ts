import { EventStatus, EventType } from '@prisma/client';
import { Invitation } from './Invitation';
import { User } from './User';

export interface Event {
  id: number;
  title: string;
  location: string;
  type: EventType;
  event_date: Date;
  link: string | null;
  picture: string | null;
  description: string | null;
  creator_id: number;
  User: User;
  date_suggestions: JSON | null;
  status: EventStatus;
  min_participants: number | null;
  response_deadline: Date | null;
  Invitation: Invitation[];
  created_at: Date;
  updated_at: Date;
}
