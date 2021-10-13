import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../hooks'

export default function MyApp({ Component, pageProps }) {
  return (
      <>
        <div>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </>
  )
}