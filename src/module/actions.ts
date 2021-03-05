import isPast from 'date-fns/isPast'
import parseISO from 'date-fns/parseISO'
import Service from '../service'
import utils from '../utils'

type Context = { prefix: string, clientSecret: string, clientID: string|number, url: string, oauthURI: string, profileURI: string }

export default function (context: Context) {
    const { getValues, parseValuesFromResponse } = utils(context)

    return {
        async login({ commit, dispatch }, payload) {
            const response = await (new Service(context)).login(payload)

            if (response.isOk) {
                commit('login', parseValuesFromResponse(response))

                await dispatch('fetchUserData')
            }

            return response
        },

        async logout({ commit }) {
            commit('logout')
        },

        async checkSession({ commit, dispatch }) {
            const values = getValues()
            const { loginAt, expirationAt, accessToken } = values

            const areInvalid = !(loginAt && expirationAt && accessToken)
            if (areInvalid || isPast(parseISO(expirationAt))) {
                return false
            }

            commit('login', values)

            const response = await dispatch('fetchUserData')

            return response
        },

        async fetchUserData({ commit }) {
            const response = await (new Service(context)).fetchUserData()

            if (response.isOk) {
                commit('setUserData', response.data)
            }
            return response
        }
    }
}
