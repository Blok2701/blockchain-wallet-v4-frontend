import { compose, curry, map, mergeDeepLeft } from 'ramda'

const getAuthOptions = ({ email, guid, token }) => ({
  headers: {
    'X-WALLET-GUID': guid,
    'X-WALLET-EMAIL': email,
    Authorization: `Bearer ${token}`
  }
})

const injectAuthCredentials = curry(
  (getAuthCredentials, reauthenticate, request, options) =>
    compose(
      request,
      mergeDeepLeft(options),
      getAuthOptions
    )(getAuthCredentials()).catch(error => {
      // 🚨!
      // 401 status means access token expired
      // BAD_2FA type means 2fa required by PIT
      // There may be other errors that are status 401 that should be whitelisted
      // Otherwise yield api call can return reauth actionType (@EVENT.PROFILE.SIGN_IN)
      if (error.status !== 401 || error.type === 'BAD_2FA') throw error

      return reauthenticate()
    })
)

export default (http, getAuthCredentials, reauthenticate) =>
  map(injectAuthCredentials(getAuthCredentials, reauthenticate), http)
