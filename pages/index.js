import Head from "next/head"
import { useRouter } from 'next/router'
import { useToasts } from "react-toast-notifications"
import { useState, useEffect } from "react"
import HttpService from "../services/HttpService"

export default function Home() {
  const router = useRouter()
  const { addToast } = useToasts()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token')) { router.replace('/menu') }
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()

    const httpOptions = {
      url: 'auth/login',
      data: {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    }
    const data = await HttpService(httpOptions)
    console.log(data)
    addToast('Giriş yapıldı.', { appearance: 'success'})
    router.replace('/menu')
  }

  return (
    <>
      <div className="container flex flex-col items-center justify-center mx-auto min-h-screen py-2">
        <Head>
          <title>Giriş</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col items-center justify-center w-full px-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold md:mb-10">
            Giriş
          </h1>
          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row w-full items-start justify-start md:items-center md:justify-center mt-6">
              <label 
                className="text-gray-600 font-bold mb-1 pr-4 md:w-16"
                htmlFor="email"
              >
                Email
              </label>
              <input 
                className="bg-gray-200 appearance-none shadow-lg border-2 border-gray-200 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700" 
                id="email" 
                type="email" 
                placeholder="example@email.com"
                required
                onChange={e => {setEmail(e.target.value)}}>
              </input>
            </div>
            <div className="flex flex-col md:flex-row w-full items-start justify-start md:items-center md:justify-center mt-4 md:mt-6 mb-6">
              <label 
                className="text-gray-600 font-bold mb-1 pr-4 md:w-16"
                htmlFor="password"
              >
                Şifre
              </label>
              <input 
                className="bg-gray-200 appearance-none shadow-lg border-2 border-gray-200 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700" 
                id="password" 
                type="password" 
                placeholder="••••••••"
                required
                onChange={e => {setPassword(e.target.value)}}>
              </input>
            </div>
            <div className="mt-4">
                <button
                  className="shadow w-full bg-blue-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-12 rounded" 
                  type="submit"
                >
                  Giriş
                </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}