import makeActions from './module/actions'
import makeMutations from './module/mutations'
import state from './module/state'

export default function (context = {
    prefix: '',
    clientSecret: '',
    clientID: '',
    url: 'localhost:8000',
    profileURI: '/api/user',
    oauthURI: '/oauth/token'
}) {
    return {
        namespaced: true,
        state,
        actions: makeActions(context),
        mutations: makeMutations(context),
        getters: {}
    }
}
