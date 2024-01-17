/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2GSltXzEsKY
 */

import dynamic from 'next/dynamic';

const InitGroup = dynamic(() => import('@/init/_initgroup.client'), { ssr: false });
const Assignments = dynamic(() => import('@/components/assignmentsPage/assignments.client'), { ssr: false });

// Import the background image

export default function Home() {

  return (
    <>
      <InitGroup/>
      <main className="flex flex-col h-screen" style={{
        backgroundImage: `url('/background.jpeg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <Assignments />
      </main>
    </>
  )
}