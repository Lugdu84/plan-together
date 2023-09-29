'use client';

import { useParams } from 'next/navigation';
import ResetPasswordForm from './form';

export default function ResetPasswordPage() {
  const { resetPasswordToken } = useParams();
  console.log(resetPasswordToken);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ResetPasswordForm token={resetPasswordToken} />
    </div>
  );
}
