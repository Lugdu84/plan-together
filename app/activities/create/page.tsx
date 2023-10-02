'use client';

import { useFormik } from 'formik';
import React, { useState } from 'react';
import { ActivityStatus, ActivityType } from '@prisma/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createActivity } from '@/app/activities/_actions/activitiesActions';
import ActivityFrontSchema from '@/validation/ActivityFront';
import ActivityDraft from '@/interfaces/ActivityDraft';

export default function CreateActivity() {
  const [errorMessage, setErrorMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      type: ActivityType.ONLINE,
      date: new Date(),
      picture: '',
      description: '',
      status: ActivityStatus.DRAFT,
    },
    validationSchema: ActivityFrontSchema,
    onSubmit: async (values: ActivityDraft) => {
      setErrorMessage('');
      // INFO: createActivity en cas de succés return void, sinon erreur
      // TODO: TOAST A LA PLACE
      const error = await createActivity(values);
      if (error === 'user_not_found') {
        setErrorMessage('Utilisateur non identifié');
      }
      if (error === 'database_insertion_error') {
        setErrorMessage("Incident lors de l'enregistrement");
      }
      if (error === 'validation_error') {
        setErrorMessage('Données non conformes');
      }
    },
  });

  return (
    <section className="flex flex-col justify-start items-center align-top w-screen h-screen px-16 py-16 lg:py-32 xl:px-32">
      <Card>
        <CardHeader>
          <h1 className="font-serif text-xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight pb-10">
            Créer un événement
          </h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            {errorMessage ? (
              <div className="text-red-500 pb-4">{errorMessage}</div>
            ) : null}
            <div>
              <label htmlFor="title">
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-lg font-bold">
                    Titre de l&apos;&eacute;v&egrave;nement*
                  </span>
                  <input
                    required
                    type="text"
                    className="rounded-lg"
                    {...formik.getFieldProps('title')}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-400">{formik.errors.title}</div>
                  ) : null}
                </div>
              </label>
              <label htmlFor="location">
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-lg font-bold">Lieu*</span>
                  <input
                    required
                    type="text"
                    {...formik.getFieldProps('location')}
                    className="rounded-lg"
                  />
                  {formik.touched.location && formik.errors.location ? (
                    <div className="text-red-400">{formik.errors.location}</div>
                  ) : null}
                </div>
              </label>
              <label htmlFor="type">
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-lg font-bold">Type*</span>
                  <input
                    required
                    type="text"
                    {...formik.getFieldProps('type')}
                    className="rounded-lg"
                  />
                  {formik.touched.type && formik.errors.type ? (
                    <div className="text-red-400">{formik.errors.type}</div>
                  ) : null}
                </div>
              </label>
              <label htmlFor="date">
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-lg font-bold">Date*</span>
                  <input
                    required
                    type="datetime-local"
                    {...formik.getFieldProps('date')}
                    className="rounded-lg"
                  />
                  {formik.touched.date && formik.errors.date ? (
                    <div className="text-red-400">
                      {formik.errors.date as string}
                    </div>
                  ) : null}
                </div>
              </label>
            </div>
            <button
              className="px-8 py-4 mt-4 bg-green-800 hover:bg-green-950 transition-colors text-white text-lg rounded-lg"
              type="submit"
            >
              C&apos;est parti !
            </button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
