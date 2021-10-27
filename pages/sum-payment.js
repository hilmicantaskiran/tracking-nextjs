import Head from "next/head"
import axios from "axios"
import { useState, useEffect } from "react"

export default function SumPayment() {
    const initialValue = []
    const date = []
    const [image, setImage] = useState('')
    const [showModel, setShowModel] = useState(false)
    const [paymentsInfo, setPaymentsInfo] = useState(initialValue)

    useEffect(() => {
        const uri = process.env.NEXT_PUBLIC_API_URL
        const res = axios.get(uri + 'payment/ownPayments', {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.getItem('token')
            }
        }).then((res) => {
            const response = res.data.data.paymentList
            console.log(response)
            setPaymentsInfo(response)
        })
    }, [])

    for (let i = 0; i < paymentsInfo.length; i++) {
        const split = new Date(paymentsInfo[i].date)
        const year = split.getFullYear()
        const month = split.getMonth() + 1
        const dt = split.getDate()
        const hour = split.getHours()
        const minute = split.getMinutes()

        if (dt < 10) {
            dt = '0' + dt
        }
        if (month < 10) {
            month = '0' + month
        }
        date.push(dt + '/' + month + '/' + year + ' - ' + hour + ':' + minute)
    }

    return (
        <>
            <div className="container flex mx-auto min-h-screen py-2">
                <Head>
                    <title>Harcamalarım</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="flex flex-col w-full items-center justify-start text-center px-2">
                    <p className="text-4xl font-bold mt-20 text-center mb-10">Harcamalarım</p>
                    <div className="flex flex-wrap items-center justify-center max-h-full max-w-7xl mb-6">   
                        {paymentsInfo.length !== 0 ? (
                            paymentsInfo.map((payment, i) => (
                                <ul className="w-full flex flex-wrap md:w-2/5 bg-white border-2 rounded-xl m-1.5 md:m-2 shadow-md" key={ payment.date }>
                                    <div className="flex flex-row w-full items-center justify-start text-left">
                                        <div className="flex flex-row w-full justify-start items-center">
                                            <div className="px-2 py-2 w-24 h-full text-center">
                                                <p className="text-center font-bold">{ payment.price }₺</p>   
                                            </div>
                                            <div className="flex flex-col w-full h-full p-4 border-l-2">
                                                <div className="flex flex-row">
                                                    <p className="text-sm text-left font-bold">Tarih:</p>
                                                    <p className="text-sm text-left ml-1">{ date[i] }</p>
                                                </div>
                                                <div className="flex flex-row">
                                                    <p className="text-sm text-left font-bold">Açıklama:</p>
                                                    <p className="text-sm text-left ml-1">{ payment.description }</p>
                                                </div>
                                                <p className="text-sm text-left"></p>
                                                <p className="text-sm text-left font-bold">Kişiler: </p>
                                                {payment.partnerPays.length !== 0 ? (
                                                    payment.partnerPays.map((partner) => (
                                                        <div key={ partner.FullName }>
                                                            <li className="text-sm text-left list-disc list-inside">{ partner.FullName } </li> 
                                                        </div>
                                                    ))
                                                ) : (
                                                        <div className="text-sm text-left">Eklenen kişi yok</div>
                                                    )
                                                } 
                                                <label 
                                                    className="border-2 text-left rounded-xl hover:border-blue-600 hover:text-blue-600 shadow-inner mt-2"
                                                    onClick={ () => { 
                                                            setImage("https://odemetakip.herokuapp.com/" + payment.imagePath),
                                                            setShowModel(true)
                                                        } 
                                                    }
                                                >
                                                    <p className="text-sm my-2 text-center">Fotoğraf</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </ul>     
                            ))
                        ) : (
                            <div className="text-center p-2">Herhangi bir harcama bulunmamaktadır.</div>
                        )}
                    </div>
                </div>
            </div>
            {showModel ? (
                <> 
                    <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-2 outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl rounded-lg">
                            <div className="border-2 rounded-lg shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <p className="text-center mt-4 font-bold">Fotoğraf</p>
                                <div className="relative items-center justify-center p-4 mx-auto">
                                    <img src={ image } className=""/>
                                </div>
                                <div className="flex items-center justify-center mb-2">
                                    <button
                                        className="background-transparent font-bold uppercase p-2 rounded-xl text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300"
                                        type="button"
                                        onClick={() => setShowModel(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}