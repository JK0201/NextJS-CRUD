import { cookies } from 'next/headers';
import Canvas from './Canvas';

export default function Home() {
  const mode = cookies().get('mode').value;

  return (
    <div>
      <Canvas mode={mode} />
      <div className="main-text-box">
        <h1>
          Welcom to NextJS <br />
          community
        </h1>
      </div>
    </div>
  );
}
