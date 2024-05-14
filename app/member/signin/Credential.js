'use client';

import { signIn } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

export default function Credential() {
  const [callbackUrl, setCallbackUrl] = useState('');
  const [err, setErr] = useState('');
  const emailRef = useRef('');
  const passRef = useRef('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setCallbackUrl(searchParams.get('callbackUrl'));
    setErr(searchParams.get('error'));
  }, []);

  const credSignIn = async () => {
    let email = emailRef.current;
    let pass = passRef.current;

    if (!email || !pass) {
      alert('아이디와 비밀번호를 입력하세요');
      return;
    }

    signIn('credentials', {
      email: email,
      pass: pass,
      redirect: true,
      callbackUrl: callbackUrl ?? 'http://localhost:3000',
    });
  };

  return (
    <div className="cred-signin-box">
      <div className="cred-signin">
        <p>Email</p>
        <input
          type="text"
          className="cred-input"
          onChange={(e) => {
            emailRef.current = e.target.value;
          }}
        />
      </div>
      <div className="cred-space" />
      <div className="cred-signin">
        <p>Password</p>
        <input
          type="password"
          className="cred-input"
          onChange={(e) => {
            passRef.current = e.target.value;
          }}
        />
      </div>
      <div className="signin-btn-box">
        <div className="signin-btn" onClick={credSignIn}>
          <span className="c-white">로그인</span>
        </div>
      </div>
      {err ? (
        <div className="cred-signin">
          <p style={{ textAlign: 'center', color: 'red' }}>아이디, 비밀번호를 확인해주세요</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
