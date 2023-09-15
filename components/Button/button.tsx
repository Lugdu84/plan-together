'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

// Juste pour tester l'authentication à peaufiner

function SignInButton() {
  return (
    <button type="button" onClick={() => signIn()}>
      connexion
    </button>
  );
}
export default SignInButton;
