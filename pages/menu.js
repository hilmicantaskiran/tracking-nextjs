import Head from "next/head"
import Link from "next/link"

export default function Menu({ data }) {
    return (
        <>
            <div className="container flex flex-col items-center justify-center mx-auto min-h-screen py-2">
                <Head>
                    <title>Menu</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className="flex flex-col items-center md:justify-center w-full flex-1 px-20 text-center">
                    <p className="text-4xl font-bold mt-20 md:mt-0 text-center">{ data.name }</p>
                    <p className="text-2xl m-4 text-center">Toplam harcama: {data.price }₺</p>
                    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 md:w-full">
                        <Link href="/new-payment">
                            <h3 className="text-2xl font-bold p-6 mt-6 text-left border-2 w-96 rounded-xl hover:text-blue-600 hover:border-blue-600">Yeni Ödeme Ekle</h3>
                        </Link>
                        <Link href="/sum-payment">
                            <h3 className="text-2xl font-bold p-6 mt-6 text-left border-2 w-96 rounded-xl hover:text-blue-600 hover:border-blue-600">Toplam Harcama</h3>
                        </Link>
                        <Link href="/debt-status">
                            <h3 className="text-2xl font-bold p-6 mt-6 text-left border-2 w-96 rounded-xl hover:text-blue-600 hover:border-blue-600">Borç Durumu</h3>
                        </Link>
                        <Link href="/past-payments">
                            <h3 className="text-2xl font-bold p-6 mt-6 text-left border-2 w-96 rounded-xl hover:text-blue-600 hover:border-blue-600">Geçmiş Ödemeler</h3> 
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://odemetakip.vercel.app/api/name')
    const data = await res.json()

    return {
      props: {
        data
      },
    }
}