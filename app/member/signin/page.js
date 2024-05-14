import Link from 'next/link';
import Credential from './Credential';
import Social from './Social';

export default function SignIn() {
  return (
    <div className="signin-box">
      <h1>SIGN IN</h1>
      <Credential />
      <div className="signin-div">
        <div className="signin-div-line"></div>
        <span>OR</span>
        <div className="signin-div-line"></div>
      </div>
      <Social />
      <div className="cred-signin">
        <p style={{ textAlign: 'center' }}>
          회원이 아니신가요?<Link href="/member/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
