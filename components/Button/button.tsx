'use client';

/* eslint-disable import/prefer-default-export */

import React from 'react';
import { signIn, signOut } from 'next-auth/react';

// Juste pour tester l'authentication à peaufiner

export function SignInButton() {
  return (
    <button type="button" onClick={() => signIn()}>
      connexion
    </button>
  );
}

export function LogOutBtn() {
  return (
    <div>
      <button type="button" onClick={() => signOut()}>
        Deconnexion
      </button>
    </div>
  );
}
