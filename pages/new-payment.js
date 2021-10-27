import Head from "next/head"
import axios from 'axios'
import Select from "react-select"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useToasts } from 'react-toast-notifications'
import HttpService from "../services/HttpService"

export default function NewPayment() {
    const router = useRouter()
    const { addToast } = useToasts()
    const option = []
    let stuffIDs = []

    const [names, setNames] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    
    const getNames = async () => {
        const uri = process.env.NEXT_PUBLIC_API_URL
        const res = await axios.get(uri + 'payment/getInfo', {
            headers: {
                'Authorization': 'Bearer ' +  localStorage.getItem('token')
            }
        }).then((res) => {
            const response = res.data.data[0]
            {response.users.map((d) => (
                option.push({
                    'value': d.userID,
                    'label': d.firstName
                })
            ))}
        })
    }

    getNames()
    
    if (names.length != 0) {
        for (var id of names) {
            stuffIDs.push(id.value)
        }
    }
    else {
        stuffIDs = []
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const formData = new FormData()

        formData.append('description', description)
        formData.append('price', amount)
        formData.append('stuffIDs', stuffIDs)
        formData.append('image', image)
    
        const httpOptions = {
          url: 'payment/616478272ad64d9b6ce80306',
          data: {
            method: 'POST',
            body: formData,
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }
        }
        const data = await HttpService(httpOptions)
        console.log(data)
        if (data.success) {
            addToast('Ödeme başarıyla eklendi.', { appearance: 'success'})
            router.replace('/menu')
        }
        else {
            addToast('Ödeme ekleme başarısız oldu.', { appearance: 'error' })
        }
    }

    return (
        <>
            <div className="container flex flex-col items-center justify-center mx-auto min-h-screen py-2">
                <Head>
                    <title>Yeni Ödeme</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className="flex flex-col md:items-center md:justify-center w-full flex-1 px-10 text-center">
                    <div className="flex items-center justify-center text-center">
                        <p className="font-bold text-4xl mt-20 mb-6 md:mt-0 md:mb-10">Yeni Ödeme</p>
                    </div>
                    <form className="w-full flex flex-col items-center justify-center" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row w-full items-start justify-start md:items-center md:justify-center mt-6">
                            <label 
                                className="text-gray-600 font-bold mb-1 pr-4 md:w-36"
                                htmlFor="amount"
                            >
                                Harcama Miktarı
                            </label>
                            <input 
                                className="bg-white shadow-md border border-gray-300 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700" 
                                id="amount" 
                                type="number"
                                step="0.01"
                                required
                                onChange={e => {setAmount(e.target.value)}}
                            >
                            </input>
                        </div>
                        <div className="flex flex-col md:flex-row w-full items-start justify-start md:items-center md:justify-center mt-4 md:mt-6">
                            <label 
                                className="text-gray-600 font-bold -mb-1 pr-4 md:w-36"
                                htmlFor="person"
                            >
                                Kişiler
                            </label>
                            <Select
                                className="shadow-md w-full md:w-1/3 mt-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-700"
                                instanceId={option}
                                closeMenuOnSelect={true}
                                isMulti
                                options={option}
                                placeholder="Kişi seçin"
                                onChange={e => {setNames(e)}}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row w-full items-start justify-start md:items-center md:justify-center mt-4 md:mt-6">
                            <label 
                                className="text-gray-600 font-bold mb-1 pr-4 md:w-36"
                                htmlFor="description"
                            >
                                Açıklama
                            </label>
                            <textarea 
                                className="bg-white shadow-md border border-gray-300 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700" 
                                id="description"
                                rows="3"
                                required
                                onChange={e => {setDescription(e.target.value)}}
                            >
                            </textarea>
                        </div>
                        <div className="flex flex-col md:flex-row w-full items-start justify-start md:items-center md:justify-center mt-4 md:mt-6">
                            <label 
                                className="text-gray-600 font-bold mb-1 pr-4 md:w-36"
                            >
                                Fotoğraf
                            </label>
                            <input 
                                className="bg-white shadow-md border border-gray-300 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700" 
                                id="image"
                                type="file"
                                accept="image/*"
                                required
                                onChange={e => {setImage(e.target.files[0])}}
                            >
                            </input>
                        </div>
                        <div className="mt-10">
                            <button
                                className="shadow-md w-full bg-blue-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-12 rounded" 
                                type="submit"
                            >
                                Ödemeyi Ekle
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}