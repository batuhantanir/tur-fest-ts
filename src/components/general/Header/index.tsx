'server-only';
import React from 'react';

import Mobile from './components/Mobile';
import Desktop from './components/Desktop';
import Auth from './components/auth';
import SignOut from './components/SignOut';

function Header() {
  return (
    <>
      {/* Yer tutucu */}
      <Desktop>
        <Auth>
          <SignOut />
        </Auth>
      </Desktop>
      <Mobile>
        <Auth>
          <SignOut />
        </Auth>
      </Mobile>
    </>
  );
}

export default Header;
