import React from 'react';
import LinkButton from './LinkButton';
import { FaUser } from 'react-icons/fa';

interface LoginAndRegisterProps {
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginAndRegister({ setOpenNavbar }: LoginAndRegisterProps) {
  return (
    <>
      <LinkButton
        onClick={() => setOpenNavbar(false)}
        icon={FaUser}
        href="/login"
      >
        Giriş yap
      </LinkButton>
      <LinkButton onClick={() => setOpenNavbar(false)} href="/register">
        Üye ol
      </LinkButton>
    </>
  );
}

export default LoginAndRegister;
