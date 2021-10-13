import Head from "next/head"
import Link from "next/link"
import axios from "axios"
import { useState } from "react"

export default function Menu() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const getNames = async () => {
        const uri = process.env.NEXT_PUBLIC_API_URL
        const res = await axios.get(uri + 'users/getUserInfo', {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.getItem('token')
            }
        }).then((res) => { 
            const response = res.data.data
            setName(response.user.firstName + ' ' + response.user.lastName)
            setPrice(response.payments[0].totalPayment)
        })
    }

    getNames()

    return (
        <>
            <div className="container flex flex-col items-center justify-start md:justify-center mx-auto min-h-screen py-2">
                <Head>
                    <title>Menu</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className="flex flex-col items-center justify-center w-full px-6 text-center">
                    <p className="text-4xl font-bold mt-20 md:mt-0 text-center">{ name }</p>
                    <p className="text-2xl m-4 text-center">Toplam harcama: { price }₺</p>
                    <div className="flex flex-wrap items-start justify-around max-w-4xl mt-6 w-full">
                        <Link href="/new-payment">
                            <h3 className="text-xl font-bold p-6 mt-4 text-left border-2 border-gray-300 w-96 rounded-xl hover:text-blue-600 hover:border-blue-600">Yeni Ödeme Ekle</h3>
                        </Link>
                        <Link href="/sum-payment">
                            <h3 className="text-xl font-bold p-6 mt-4 text-left border-2 border-gray-300 w-96 rounded-xl hover:text-blue-600 hover:border-blue-600">Harcamalarım</h3>
                        </Link>
                        <Link href="/debt-status">
                            <h3 className="text-xl font-bold p-6 mt-4 text-left border-2 border-gray-300 w-96 rounded-xl hover:text-blue-600 hover:border-blue-600">Borç Durumu</h3>
                        </Link>
                        <Link href="/past-payments">
                            <h3 className="text-xl font-bold p-6 mt-4 text-left border-2 border-gray-300 w-96 rounded-xl hover:text-blue-600 hover:border-blue-600">Geçmiş Ödemeler</h3> 
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
}