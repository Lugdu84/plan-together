import Link from 'next/link';
import { rowan } from '@/app/utilities/typography';
import { Button } from '@/components/Button/button';

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen lg:px-16 xl:px-32">
      <section className="flex flex-col gap-1 xl:w-4/5 2xl:w-3/5">
        <div className="flex flex-col pb-2">
          <h1 className="text-2xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight pb-10">
            <span className={`italic ${rowan.className}`}>Planifiez </span>
            <span className="tracking-tight">facilement </span>
            <span className={`italic ${rowan.className}`}>vos activités </span>
            <span className="tracking-tight">avec vos ami.e.s</span>
          </h1>
          <p className="prose lg:prose-xl text-gray-500 text-2xl">
            Finies les difficultés pour programmer vos sorties ou activités en
            groupe. PlanTogether s&apos;occupe de tout.
          </p>
        </div>
        <div className="flex mt-8 gap-8">
          <Button
            buttonType="primary"
            content="Commencer"
            className="hover:opacity-80 transition duration-300"
          />
          <Button
            buttonType="transparent"
            content="En savoir plus"
            className="hover:bg-slate-200 transition duration-300"
          />
          <Link href="/plan-it/activities">
            <Button
              buttonType="primary"
              content="Page d'activités"
              className="hover:opacity-80 transition duration-300"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
