import { hash } from 'bcryptjs';
import prisma from '@/prisma/prismadb';

// handler pour réinitialiser le mot de passe
// eslint-disable-next-line import/prefer-default-export
export async function handleResetPassword(req, res) {
  const { token, newPassword } = req.body;

  try {
    // Vérifiez le token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Mettez à jour le mot de passe de l'utilisateur
    const hashedPassword = await hash(newPassword, 10);
    await prisma.user.update({
      where: { id: payload.userId },
      data: { password: hashedPassword },
    });

    return res.status(200).send('Mot de passe réinitialisé avec succès');
  } catch (error) {
    return res.status(400).send('Token invalide ou expiré');
  }
}
