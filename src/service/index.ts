import Response, { handle } from './Response'
// import axios from 'axios'
// import Response, { axiosAwait } from './Response'

class Service {
    protected prefix: string

    constructor (prefix: string) {
        this.prefix = prefix
    }

    getToken (): string {
        return localStorage.getItem(`${this.prefix}_access_token`)
    }

    authHeader () {
        return {
            Authorization: this.getToken(),
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }

    commonHeader () {
        return {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
}

class SessionService extends Service {
    protected clientSecret: string
    protected clientID: string|number
    protected loginURL: string
    protected userURL: string

    constructor ({ prefix, clientSecret, clientID, url, oauthURI, profileURI }) {
        super(prefix)
        this.clientSecret = clientSecret
        this.clientID = clientID
        this.loginURL = url + '/' + oauthURI
        this.userURL = url + '/' + profileURI
    }

    login ({ username, password }): Promise<Response> {
        const body = JSON.stringify({
            username,
            password,
            client_secret: this.clientSecret,
            client_id: this.clientID,
            grant_type: 'password',
            scope: '*'
        })

        return handle(fetch(this.loginURL, {
            method: 'POST',
            headers: this.commonHeader(),
            body
        }))
    }

    fetchUserData (): Promise<Response> {
        const headers = this.authHeader()

        return handle(fetch(this.userURL, { headers }))
    }
}

export default SessionService
