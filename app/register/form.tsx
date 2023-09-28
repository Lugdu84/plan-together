'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PasswordCriteria from '../../utils/passwordCriteria';

const registerSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Doit contenir minimun 3 caractères')
    .required('Champ firstname obligatoire'),
  lastname: Yup.string()
    .min(3, 'Doit contenir minimun 3 caractères')
    .required('Champ lastname obligatoire'),
  email: Yup.string()
    .email('Invalid email')
    .required('Champ email obligatoire'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required('Champ de password obligatoire'),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setErrorMessage('');
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'content-type': 'application/json',
          },
        });
        if (response.ok) {
          signIn(undefined, { callbackUrl: '/login' });
          console.log('ok user enregistré');
        } else {
          const errorText = await response.text();
          setErrorMessage(errorText);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Une erreur est survenue.');
      }
    },
  });

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      {errorMessage ? (
        <div className="text-red-500 pb-4">{errorMessage}</div>
      ) : null}
      <div className="flex flex-col justify-center gap-8">
        <label htmlFor="firstname">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Firstname</span>
            <input
              required
              type="text"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-lg"
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="text-red-500">{formik.errors.firstname}</div>
            ) : null}
          </div>
        </label>
        <label htmlFor="lastname">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Lastname</span>
            <input
              required
              type="text"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-lg"
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="text-red-500">{formik.errors.lastname}</div>
            ) : null}
          </div>
        </label>
        <label htmlFor="email">
          <div className="flex flex-col gap-2  w-full">
            <span className="text-lg font-bold">Email</span>
            <input
              required
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            <PasswordCriteria password={formik.values.password} />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
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
