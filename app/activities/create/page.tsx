'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createActivity } from '@/app/activities/_actions/activitiesActions';
import ActivitySchema from '@/validation/Activity';
import { Activity } from '@/interfaces/Activity';

export default function CreateActivity() {
  const [errorMessage, setErrorMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      // type: '',
      // date: '',
      picture: '',
      description: '',
      // status: '',
    },
    validationSchema: ActivitySchema,
    onSubmit: async (values: Activity) => {
      setErrorMessage('');
      try {
        const result = await createActivity(values);
        console.log(result);
      } catch (error) {
        console.error(error);
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
          <form onSubmit={formik.handleSubmit} method="POST">
            <div>
              <label htmlFor="title">
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-lg font-bold">
                    Titre de l&apos;&eacute;v&egrave;nement*
                  </span>
                  <input
                    required
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="rounded-lg"
                  />
                </div>
              </label>
              <label htmlFor="location">
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-lg font-bold">Lieu*</span>
                  <input
                    required
                    type="text"
                    name="location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                    className="rounded-lg"
                  />
                </div>
              </label>
              <label htmlFor="type">
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-lg font-bold">Type*</span>
                  <input
                    required
                    type="text"
                    name="type"
                    className="rounded-lg"
                  />
                </div>
              </label>
              <label htmlFor="date">
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-lg font-bold">Date*</span>
                  <input
                    required
                    type="text"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="rounded-lg"
                  />
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
