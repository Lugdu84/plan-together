'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PasswordCriteria from '@/utils/passwordCriteria';

interface FormValues {
  password: string;
  passwordConfirmation: string;
}

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .required('Champ de password obligatoire'),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), undefined],
      'Les mots de passe doivent correspondre',
    )
    .required('Confirmation de mot de passe obligatoire'),
});

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik<FormValues>({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setErrorMessage('');
      console.log(values);
    },
  });

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <form onSubmit={formik.handleSubmit} className="w-full max-w-md mx-auto">
      {errorMessage ? (
        <div className="text-red-500 pb-4">{errorMessage}</div>
      ) : null}
      <div className="flex flex-col justify-center gap-8">
        <label htmlFor="password">
          <div className="flex flex-col gap-2  w-full relative">
            <span className="text-lg font-bold">Nouveau mot de passe</span>
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
        <label htmlFor="passwordConfirmation">
          <div className="flex flex-col gap-2  w-full relative">
            <span className="text-lg font-bold">
              Confirmer votre nouveau mot de passe
            </span>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
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
            {formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation ? (
              <div className="text-red-500">
                {formik.errors.passwordConfirmation}
              </div>
            ) : null}
          </div>
        </label>
        <button
          className="px-8 py-4  mt-4 bg-green-800 hover:bg-green-950 transition-colors text-white text-lg rounded-lg"
          type="submit"
        >
          Sauvegarder votre nouveau mot de passe!
        </button>
      </div>
    </form>
  );
}
