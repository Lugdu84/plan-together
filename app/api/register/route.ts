import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import * as Yup from 'yup';
import prisma from '@/prisma/prismadb';

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
// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, password } = (await req.json()) as {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    };
    await registerSchema.validate({ firstname, lastname, email, password });
    const hashpw = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashpw,
      },
    });
    return NextResponse.json({
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error && error.code === 'P2002') {
      return new Response('Cette adresse e-mail est déjà utilisée.', {
        status: 400,
      });
    }
    if (error instanceof Yup.ValidationError) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }
    return new Response('Une erreur est survenue.', { status: 500 });
  }
}
