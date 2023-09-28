import jwt from 'jsonwebtoken';
import prisma from '@/prisma/prismadb';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const { email } = requestBody as { email: string };
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return new Response('Aucun utilisateur trouvé', { status: 404 });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
      },
      jwtSecret,
      {
        expiresIn: '1h',
      },
    );
    // Envoyez un e-mail avec le lien de réinitialisation
    console.log(`http://localhost:3000/reset-password?token=${token}`);
    return new Response('Un e-mail a été envoyé', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Une erreur est survenue', { status: 500 });
  }
}
