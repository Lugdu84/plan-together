import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/app/utilities/prismadb';

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
  } catch (error) {
    // TODO: implement toast
    console.error(error);
    // return new NextResponse();
  }
}
