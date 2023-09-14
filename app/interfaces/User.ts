export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  gender: string | null;
  pronouns: string | null;
  profile_picture: string | null;
  sign_up_date: Date;
  created_at: Date;
  updated_at: Date;
}
