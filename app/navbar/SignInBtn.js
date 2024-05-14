'use client';

import { signIn, signOut } from 'next-auth/react';

export default function SignInBtn({ session }) {
  return (
    <div className="navbar-btn-box">
      {session ? (
        <>
          <div
            className="navbar-btn"
            onClick={() => {
              signOut();
            }}
          >
            <span>🚫</span>
            <span className="navbar-btn-text"> SIGN OUT</span>
          </div>
        </>
      ) : (
        <div
          className="navbar-btn"
          onClick={() => {
            signIn();
          }}
        >
          <span>🔑</span>
          <span className="navbar-btn-text"> SIGN IN</span>
        </div>
      )}
    </div>
  );
}
