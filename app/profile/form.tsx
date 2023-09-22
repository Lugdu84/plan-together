'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LoginForm(props: any) {
  console.log('form', props);
  const { user } = props;
  return (
    <form action="">
      <div className="space-y-1">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" defaultValue={user.firstname} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email"> Email </Label>
        <Input id="email" defaultValue={user.email} />
      </div>
    </form>
  );
}
