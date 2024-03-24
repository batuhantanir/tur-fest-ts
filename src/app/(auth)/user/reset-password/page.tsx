'use client';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResetPassword from '@/components/login/ResetPassword';

function ResetPasswordPage() {
  const router = useRouter();
  const token = useSearchParams().get('reset_token');
  if (!token) return router.push('/');
  return <ResetPassword resetToken={token} />;
}

export default ResetPasswordPage;
