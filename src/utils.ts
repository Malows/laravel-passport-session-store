import { addDays, addSeconds, formatISO } from 'date-fns'

export default function ({ prefix }) {
    return {
        getValues () {
            return {
                accessToken: localStorage.getItem(`${prefix}_access_token`),
                refreshToken: localStorage.getItem(`${prefix}_refresh_token`),
                loginAt: localStorage.getItem(`${prefix}_login_at`),
                expirationAt: localStorage.getItem(`${prefix}_expiration_at`),
                refreshExpirationAt: localStorage.getItem(`${prefix}_refresh_expiration_at`)
            }
        },

        parseValuesFromResponse ({ data }) {
            const loginAt = new Date()
            const expirationAt = addSeconds(loginAt, data.expires_in)
            const refreshExpirationAt = addDays(expirationAt, 7)

            return {
                accessToken: `${data.token_type} ${data.access_token}`,
                refreshToken: `${data.token_type} ${data.refresh_token}`,
                loginAt: formatISO(loginAt),
                expirationAt: formatISO(expirationAt),
                refreshExpirationAt: formatISO(refreshExpirationAt)
            }
        }
    }
}
