'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
});

export default function ForgottenPasswordForm() {
  const [message, setMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setMessage('');
      try {
        const response = await fetch('/api/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const text = await response.text();
        if (response.ok) {
          setMessage(text);
        } else {
          setMessage(text);
        }
      } catch (error) {
        console.log(error);
        setMessage('Une erreur est survenue.');
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md mx-auto">
        {message ? <div className="text-red-500 pb-4">{message}</div> : null}
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
                className="rounded-lg w-full"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
          </label>
          <button
            className="px-8 py-4 bg-green-800 hover:bg-green-950 transition-colors text-white text-lg rounded-lg w-full"
            type="submit"
          >
            Envoyer le lien de réinitialisation
          </button>
        </div>
      </form>
    </div>
  );
}
