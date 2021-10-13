import 'tailwindcss/tailwind.css'

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