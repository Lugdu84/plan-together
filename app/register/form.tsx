'use client';

import React, { useState, ChangeEvent } from 'react';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {
  const [formRegisterValues, setFormRegisterValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formRegisterValues),
        headers: {
          'content-type': 'application/json',
        },
      });
      if (!response.ok) {
        // TODO: implement toast
        console.log("la réponse n'est pas ok!!");
        return;
      }
      // TODO: implement toast
      signIn(undefined, { callbackUrl: '/login' });
      console.log('ok user enregistré');
    } catch (error) {
      // TODO: implement toast
      console.error(error);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormRegisterValues({
      ...formRegisterValues,
      [name]: value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="firstname">
        Firstname
        <input
          required
          type="text"
          name="firstname"
          value={formRegisterValues.firstname}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="lastname">
        Lastname
        <input
          required
          type="text"
          name="lastname"
          value={formRegisterValues.lastname}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          required
          type="email"
          name="email"
          value={formRegisterValues.email}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          required
          type="password"
          name="password"
          value={formRegisterValues.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit"> Register</button>
    </form>
  );
}
