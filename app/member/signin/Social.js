'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Social() {
  const [callbackUrl, setCallbackUrl] = useState('');

  const socialSignin = (type) => {
    const searchParams = new URLSearchParams(window.location.search);
    setCallbackUrl(searchParams.get('callbackUrl'));
    signIn(type, { redirect: true, callbackUrl: callbackUrl ?? 'http://localhost:3000' });
  };
  return (
    <div className="social-signin-box">
      <div
        className="social-signin"
        style={{ backgroundColor: '#FEE500' }}
        onClick={() => {
          socialSignin('kakao');
        }}
      >
        <img src="/Kakao.svg" className="social-icon" />
        <span className="c-black">Sign in with Kakao</span>
        <div></div>
      </div>
      <div
        className="social-signin"
        style={{ backgroundColor: '#02C759' }}
        onClick={() => {
          socialSignin('naver');
        }}
      >
        <img src="/Naver.svg" className="social-icon" />
        <span className="c-white">Sign in with Naver</span>
        <div></div>
      </div>
      <div
        className="social-signin bg-white"
        onClick={() => {
          socialSignin('google');
        }}
      >
        <img src="/Google.svg" className="social-icon" />
        <span className="c-black">Sign in with Google</span>
        <div></div>
      </div>
      <div
        className="social-signin bg-black"
        onClick={() => {
          socialSignin('github');
        }}
      >
        <img src="/GitHub.svg" className="social-icon" />
        <span className="c-white">Sign in with GitHub</span>
        <div></div>
      </div>
    </div>
  );
}
