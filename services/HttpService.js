export default async function HttpService(options) {
    const token = localStorage.getItem("token")

    const uri = process.env.NEXT_PUBLIC_API_URL
    // const uri_local = process.env.NEXT_PUBLIC_API_URL_LOCAL

    var header = {}

    if (!token) {
        header = {
            'Content-Type': 'application/json',
        }
    }
    else {
        header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const httpOptions = {
        method: 'GET',
        body: {},
        headers: header
    }
    
    Object.assign(httpOptions, options.data)

    const response = await fetch(uri + options.url, httpOptions)
    // const response = await fetch(uri_local + options.url, httpOptions)
    const data = await response.json()
    if (options.url == 'auth/login') {
        localStorage.setItem('token', data.data.token)
    }
    
    return data
}

