'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';

const validationSchema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().required('Mot de passe requis'),
});

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
        });
        if (response?.status === 500) {
          setServerError('Erreur serveur. Veuillez réessayer plus tard.');
        } else if (response?.error && response.error === 'CredentialsSignin') {
          setServerError('E-mail ou mot de passe incorrect');
        } else {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error(err);
        setServerError('Une erreur est survenue');
      }
    },
  });

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      {serverError ? (
        <div className="text-red-500 pb-4">{serverError}</div>
      ) : null}
      <div className="flex flex-col justify-center gap-8">
        <label htmlFor="email">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Email</span>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="rounded-lg"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
        </label>
        <label htmlFor="password">
          <div className="flex flex-col gap-2  w-full relative">
            <span className="text-lg font-bold">Mot de passe</span>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="rounded-lg w-full pr-12"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
        </label>
        <Link
          href="/forgot-password"
          className="text-blue-500 hover:underline text-center mt-4"
        >
          Mot de passe oublié?
        </Link>
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
