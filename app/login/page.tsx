import LoginForm from './form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <main className="flex flex-col justify-start items-center align-top w-screen h-screen py-16 lg:py-32 xl:px-64">
      <Card className="flex flex-col justify-center items-center gap-4 w-full md:max-w-lg p-8">
        <CardHeader>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight pb-10">
            Login
          </h1>
        </CardHeader>
        <CardContent className="w-full">
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
