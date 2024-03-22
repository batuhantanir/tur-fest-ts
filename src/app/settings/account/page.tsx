import SettingsContainer from '@/components/settings/SettingsContainer';
import AccountForm from './AccountForm';
import { getServerAuthSession } from '@/server/auth';

const Account = async () => {
  const authSession: any = await getServerAuthSession();

  return (
    <SettingsContainer username={authSession?.user.name}>
      <AccountForm token={authSession.auth_token} />
    </SettingsContainer>
  );
};

export default Account;
