import jwt, { JwtPayload } from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import prisma from '@/prisma/prismadb';

interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
}

// handler pour réinitialiser le mot de passe
// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const { password, token } = requestBody as {
      password: string;
      token: string;
    };

    let decodedToken;
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    try {
      decodedToken = jwt.verify(token, jwtSecret) as TokenPayload;
    } catch (error) {
      return new Response('Le lien est invalide', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });
    if (!user) {
      return new Response('Aucun utilisateur trouvé', { status: 404 });
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.update({
      where: {
        id: decodedToken.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return new Response('Mot de passe mis à jour', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Une erreur est survenue', { status: 500 });
  }
}
