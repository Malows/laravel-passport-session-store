export default function ({ prefix }) {
    return {
        login (state, payload) {
            const { accessToken, refreshToken, loginAt, expirationAt, refreshExpirationAt } = payload

            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.loginAt = loginAt
            state.expirationAt = expirationAt
            state.refreshExpirationAt = refreshExpirationAt

            localStorage.setItem(`${prefix}_access_token`, accessToken)
            localStorage.setItem(`${prefix}_refresh_token`, refreshToken)
            localStorage.setItem(`${prefix}_login_at`, loginAt)
            localStorage.setItem(`${prefix}_expiration_at`, expirationAt)
            localStorage.setItem(`${prefix}_refresh_expiration_at`, refreshExpirationAt)
        },

        logout (state) {
            state.accessToken = null
            state.refreshToken = null
            state.loginAt = null
            state.expirationAt = null
            state.refreshExpirationAt = null
            state.user = null

            localStorage.removeItem(`${prefix}_access_token`)
            localStorage.removeItem(`${prefix}_refresh_token`)
            localStorage.removeItem(`${prefix}_login_at`)
            localStorage.removeItem(`${prefix}_expiration_at`)
            localStorage.removeItem(`${prefix}_refresh_expiration_at`)
        },

        setUserData (state, user) {
            state.user = user
        }
    }
}
