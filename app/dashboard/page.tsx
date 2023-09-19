'use client';

import { signOut } from 'next-auth/react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button/button';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        buttonType="validate"
        content="Ajouter un super truc"
        onClick={() => signOut()}
        icon={faCheck}
      />
    </div>
  );
}
