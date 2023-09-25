import RegisterForm from './form';

export default function RegisterPage() {
  return (
    <main className="flex flex-col justify-start items-center align-top w-screen h-screen px-16 py-16 lg:py-32 xl:px-32">
      <section className="flex flex-col justify-start items-center gap-1 w-full md:max-w-lg">
        <h1 className="font-serif text-xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight pb-10">
          Inscription
        </h1>
        <RegisterForm />
      </section>
    </main>
  );
}
