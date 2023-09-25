import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismadb';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, password } = (await req.json()) as {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    };
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
    console.error(error);
    return new Response('Une erreur est survenue.', { status: 500 });
  }
}
