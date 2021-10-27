import 'tailwindcss/tailwind.css'
import { ToastProvider } from 'react-toast-notifications'

export default function MyApp({ Component, pageProps }) {
  return (
      <>
        <ToastProvider autoDismiss='true' autoDismissTimeout='5000' placement='top-center'>
          <div>
            <main className="bg-gray-100 min-h-full">
              <Component {...pageProps} />
            </main>
          </div>
        </ToastProvider>
      </>
  )
}