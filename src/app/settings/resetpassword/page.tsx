'server-only';
import React from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import ResetPasswordForm from './ResetPasswordForm';
import { getServerAuthSession } from '@/server/auth';

async function ResetPassword() {
  const authSession: any = await getServerAuthSession();

  return (
    <SettingsContainer pathname={"/settings/resetpassword"}>
      <ResetPasswordForm />
    </SettingsContainer>
  );
}

export default ResetPassword;
