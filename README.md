# laravel-passport-session-store

## Install
```sh
yarn add -D laravel-passport-session-store
# or
npm install -D laravel-passport-session-store
```

## Usage
```javascript
import makeSessionModule from 'laravel-passport-session-store'

new Vuex.Store({
    ...

    modules: {
      session: makeSessionModule({
        prefix: 'my_app',
        clientSecret: 'abc123',
        clientID: 1,
        url: 'http://localhost:8000', // default
        profileURI: '/api/user', // default
        oauthURI: '/oauth/token' // default
      }),

      ...

    },

    ...

})
```
The store module is namespaced and contains four actions
- `dispatch('session/login', { username, password })`
- `dispatch('session/logout')`
- `dispatch('session/fetchUserData')`
- `dispatch('session/checkSession')`
