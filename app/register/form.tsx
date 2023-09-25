'use client';

import React, { ChangeEvent, useState } from 'react';
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
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col justify-center gap-8">
        <label htmlFor="firstname">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Firstname</span>
            <input
              required
              type="text"
              name="firstname"
              value={formRegisterValues.firstname}
              onChange={handleChange}
              className="rounded-lg"
            />
          </div>
        </label>
        <label htmlFor="lastname">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Lastname</span>
            <input
              required
              type="text"
              name="lastname"
              value={formRegisterValues.lastname}
              onChange={handleChange}
              className="rounded-lg"
            />
          </div>
        </label>
        <label htmlFor="email">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Email</span>
            <input
              required
              type="email"
              name="email"
              value={formRegisterValues.email}
              onChange={handleChange}
              className="rounded-lg"
            />
          </div>
        </label>
        <label htmlFor="password">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Password</span>
            <input
              required
              type="password"
              name="password"
              value={formRegisterValues.password}
              onChange={handleChange}
              className="rounded-lg"
            />
          </div>
        </label>
        <button
          className="px-8 py-4  mt-4 bg-green-800 hover:bg-green-950 transition-colors text-white text-lg rounded-lg"
          type="submit"
        >
          Allons-y !
        </button>
      </div>
    </form>
  );
}
