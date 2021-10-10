import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async e => {
    e.preventDefault()
    const data = {
      email,
      password,
    }
    console.log(data)
  };

  return (
    <>
      <div className="container flex flex-col items-center justify-center mx-auto min-h-screen py-2">
        <Head>
          <title>Giriş</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col items-center justify-center w-full px-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold md:mb-10">
            Giriş
          </h1>
          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row w-full items-start justify-start md:items-center md:justify-center mt-6">
                <label 
                  className="text-gray-500 font-bold mb-1 pr-4 md:w-16"
                  htmlFor="email"
                >
                  Email
                </label>
                <input 
                  className="bg-gray-200 appearance-none shadow-lg border-2 border-gray-200 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700" 
                  id="email" 
                  type="email" 
                  placeholder="example@email.com"
                  onChange={e => {setEmail(e.target.value)}}>
                </input>
              </div>
              <div className="flex flex-col md:flex-row w-full items-start justify-start md:items-center md:justify-center mt-4 md:mt-6 mb-6">
                <label 
                  className="text-gray-500 font-bold mb-1 pr-4 md:w-16"
                  htmlFor="password"
                >
                  Şifre
                </label>
                <input 
                  className="bg-gray-200 appearance-none shadow-lg border-2 border-gray-200 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700" 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  onChange={e => {setPassword(e.target.value)}}>
                </input>
              </div>
              <div className="mt-4">
                <Link href="/menu">
                  <button
                    className="shadow w-full bg-blue-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-12 rounded" 
                    type="submit"
                  >
                    Giriş
                  </button>
                </Link>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}
