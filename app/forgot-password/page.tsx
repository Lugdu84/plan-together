import ForgottenPasswordForm from './form';

export default function ForgotPassword() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-md shadow-md">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Réinitialisation de votre mot de passe
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Si vous avez oublié votre mot de passe, pas de panique ! Entrez
            l&apos;adresse e-mail associée à votre compte dans le champ
            ci-dessous et cliquez sur &quot;Envoyer le lien de
            réinitialisation&quot;. Vous recevrez un e-mail contenant un lien
            qui vous permettra de créer un nouveau mot de passe en toute
            sécurité.
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            Assurez-vous de vérifier votre dossier de courriers indésirables si
            vous ne voyez pas l&apos;e-mail apparaître dans votre boîte de
            réception dans les quelques minutes suivant votre demande.
          </p>
          <p className="mt-2 text-center text-sm text-red-800">
            Attention : ce lien n&apos;est valable qu&apos;1 heure.
          </p>
        </div>
        <ForgottenPasswordForm />
      </div>
    </div>
  );
}
