import LoginForm from './form';

export default function LoginPage() {
  return (
    <main className="flex flex-col justify-center items-center align-middle w-screen h-screen px-8 lg:px-16 xl:px-32">
      <section className="flex flex-col justify-center items-center gap-1 w-full md:max-w-lg">
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight pb-10">
          Login
        </h1>
        <LoginForm />
      </section>
    </main>
  );
}
