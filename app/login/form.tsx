'use client';

import { signIn } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [formLoginValues, setFormLoginValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormLoginValues({ email: '', password: '' });
      const response = await signIn('credentials', {
        redirect: false,
        email: formLoginValues.email,
        password: formLoginValues.password,
      });
      if (response?.error) {
        setError('votre mdp ou email est invalide');
      } else {
        // TODO: implementer la redirection vers le dashboard
        router.push('/dashboard');
        console.log('ok vous allez etre redirigé vers le dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLoginValues({
      ...formLoginValues,
      [name]: value,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">
        <input
          required
          type="email"
          name="email"
          placeholder="test@test.fr"
          value={formLoginValues.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password">
        <input
          required
          type="password"
          name="password"
          placeholder="votre mot de passe"
          value={formLoginValues.password}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
}
