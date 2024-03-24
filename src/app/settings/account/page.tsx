'server-only';
import SettingsContainer from '@/components/settings/SettingsContainer';
import AccountForm from './AccountForm';
import { getServerAuthSession } from '@/server/auth';

const Account = async () => {
  const authSession: any = await getServerAuthSession();

  return (
    <SettingsContainer pathname="/settings/account">
      <AccountForm authSession={authSession} />
    </SettingsContainer>
  );
};

export default Account;
