import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Parse from 'parse/react-native'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUsername: ['username'],
  setPassword: ['password'],
  setToken: ['token'],
  setLogging: ['state']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: "",
  password: "",
  token: "",
  logging: false
})

/* ------------- Reducers ------------- */


export const username = (state, { username }) =>
  state.merge({ username })


export const password = (state, { password }) =>
  state.merge({ password })


export const token = (state, { token }) =>
  state.merge({ token })

export const logging = (state, { log }) =>
  state.merge({ logging: log })

/* --------------- Thunk Actions ---------------- */

export const login = () => {
  return (dispatch, getState) => {
    console.log("Logging in")
    dispatch(Creators.setLogging(true))
    Parse.User.logIn(getState().login.username, getState().login.password, {
      success: (user) => {
        dispatch(Creators.setLogging(false))
        console.log(user)
        dispatch(Creators.setToken(user.sessionToken))
        return true
      },
      error: (user, error) => {
        console.log(error)
        dispatch(Creators.setLogging(false))
        return false
      }
    })
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USERNAME]: username,
  [Types.SET_PASSWORD]: password,
  [Types.SET_TOKEN]: token,
  [Types.SET_LOGGING]: logging
})
