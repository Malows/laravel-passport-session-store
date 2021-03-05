// import errorMessage from '../generics/errorMessage'

class Response {
    isOk: boolean
    code: number
    error: string
    message: string
    data: any

    constructor(res) {
        this.isOk = res.isOk
        this.code = res.code
        this.error = res.error
        this.message = res.message
        this.data = res.data
    }
}

export default Response

async function fetchAwait (fetchPromise: Promise<any>): Promise<Response> {
    const load = new Response({})

    try {
        const res = await fetchPromise
        load.isOk = res.ok
        load.code = res.status
        load.message = ''
        load.error = null
        load.data = await res.json()
    } catch (error) {
        load.isOk = false
        load.message = error.message || error.statusText
        load.error = error
        load.code = -1
        load.data = null
    }

    return load
}

export async function handle(promise): Promise<Response> {
    return fetchAwait(promise)
}

