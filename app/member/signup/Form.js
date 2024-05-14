'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Form() {
  const router = useRouter();
  const emailRef = useRef('');
  const passRef = useRef('');
  const nicknameRef = useRef('');

  const submitHandler = async () => {
    let email = emailRef.current;
    let pass = passRef.current;
    let nickname = nicknameRef.current;

    if (!emailValid(email)) {
      alert('이메일을 확인해 주세요');
      return;
    } else if (!passValid(pass)) {
      alert('비밀번호 형식을 확인해 주세요');
      return;
    } else if (!nicknameValid(nickname)) {
      alert('닉네임을 확인해 주세요');
      return;
    }

    try {
      let resEmailChk = await fetch(`/api/auth/signup?email=${email}`);
      let emailChk;

      if (!resEmailChk?.ok) {
        let err = await resEmailChk.json();
        console.log(err.msg);
        throw new Error(err.msg);
      } else {
        emailChk = await resEmailChk.json();
      }

      if (emailChk) {
        let data = {
          email: email,
          pass: pass,
          name: nickname,
        };

        let resNewMember = await fetch(`/api/auth/signup`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!resNewMember.ok) {
          let err = await resNewMember.json();
          throw new Error(err.msg);
        } else {
          let data = await resNewMember.json();
          alert(data.msg);
          router.push('/member/signin');
        }
      } else {
        alert('이미 가입된 이메일 입니다');
        return;
      }
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  function emailValid(email) {
    let emailChk = /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]{1,20}\.[a-zA-Z]{2,6}$/.test(email);
    return emailChk;
  }

  function passValid(pass) {
    let passChk = /^[a-zA-Z0-9]{6,12}$/.test(pass);
    return passChk;
  }

  function nicknameValid(name) {
    let nicknameChk = /^[a-zA-Z가-힣0-9]{4,10}$/.test(name);
    return nicknameChk;
  }

  return (
    <div className="cred-signin-box">
      <div className="cred-signin">
        <p>Email</p>
        <input
          type="text"
          className="cred-input"
          placeholder="example@next.com"
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
          placeholder="6~12 영어 대소문자, 숫자"
          onChange={(e) => {
            passRef.current = e.target.value;
          }}
        />
      </div>
      <div className="cred-space" />
      <div className="cred-signin">
        <p>Nickname</p>
        <input
          type="text"
          className="cred-input"
          placeholder="4~10 영어 대소문자, 한글, 숫자"
          onChange={(e) => {
            nicknameRef.current = e.target.value;
          }}
        />
      </div>
      <div className="signin-btn-box">
        <div className="signin-btn" onClick={submitHandler}>
          <span className="c-white">회원가입</span>
        </div>
      </div>
      <div className="cred-signin">
        <p style={{ textAlign: 'center' }}>
          이미 회원이신가요?<Link href="/member/signin">로그인</Link>
        </p>
      </div>
    </div>
  );
}
