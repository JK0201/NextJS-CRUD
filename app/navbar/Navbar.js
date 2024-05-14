import Link from 'next/link';
import DarkMode from './DarkMode';
import Menu from './Menu';
import MenuMobile from './MenuMoblie';
import SignInBtn from './SignInBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function Navbar({ mode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className={`navbar ${mode === 'light' ? '' : 'dark-mode-navbar'}`}>
      <div className="navbar-list">
        <Link href="/">
          <h1>nextJS</h1>
        </Link>
        <DarkMode mode={mode} />
        <SignInBtn session={session} />
      </div>
      <Menu />
      <MenuMobile />
    </div>
  );
}
