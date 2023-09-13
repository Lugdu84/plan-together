import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-4xl font-bold">
        Let&apos;s go to create a beautiful app with next.js !
      </h1>
      <div>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </main>
  )
}
