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
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col justify-center gap-8">
        <label htmlFor="email">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Email</span>
            <input
              required
              type="email"
              name="email"
              placeholder="ernest@durandil.fr"
              value={formLoginValues.email}
              onChange={handleChange}
              className="rounded-lg"
            />
          </div>
        </label>
        <label htmlFor="password">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Mot de passe</span>
            <input
              required
              type="password"
              name="password"
              placeholder="***"
              value={formLoginValues.password}
              onChange={handleChange}
              className="rounded-lg"
            />
          </div>
        </label>
        <button
          className="px-8 py-4 bg-green-800 hover:bg-green-950 transition-colors text-white text-lg rounded-lg"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
}
