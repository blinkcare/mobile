import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Parse from 'parse/react-native'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUsername: ['username'],
  setPassword: ['password'],
  setPasswordTwo: ['passwordtwo'],
  setEmail: ['email'],
  setToken: ['token'],
  setLogging: ['state'],
  setMismatch: ['status'],
  setError: ['error']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: "",
  password: "",
  passwordtwo: "",
  email: "",
  token: "",
  logging: false,
  passmismatch: false,
  error: "",
})

/* ------------- Reducers ------------- */


export const username = (state, { username }) =>
  state.merge({ username })

export const error = (state, { error }) =>
  state.merge({ error })

export const password = (state, { password }) =>
  state.merge({ password })

export const password2 = (state, { passwordtwo }) =>
  state.merge({ passwordtwo })

export const email = (state, { email }) =>
  state.merge({ email })

export const token = (state, { token }) =>
  state.merge({ token })

export const logging = (state, { log }) =>
  state.merge({ logging: log })

export const mismatch = (state, { status }) =>
  state.merge({ passmismatch: status })

/* --------------- Thunk Actions ---------------- */

export const login = () => {
  return (dispatch, getState) => {
    console.log("Logging in")
    dispatch(Creators.setLogging(true))
    return new Promise((resolve, reject) => {
      Parse.User.logIn(getState().login.username, getState().login.password, {
        success: (user) => {
          dispatch(Creators.setLogging(false))
          dispatch(Creators.setError(""))
          dispatch(Creators.setToken(user.sessionToken))
          resolve()
        },
        error: (user, error) => {
          dispatch(Creators.setError(error.message))
          dispatch(Creators.setLogging(false))
          reject()
        }
      })
    })
  }
}

export const signup = () => {
  return (dispatch, getState) => {
    console.log("Signing up")
    dispatch(Creators.setLogging(true))
    var user = new Parse.User();
    user.set("username", getState().login.username)
    user.set("password", getState().login.password)
    user.set("email", getState().login.email)
    return new Promise((resolve, reject) => {
      user.signUp(null, {
        success: (user) => {
          dispatch(Creators.setError(""))
          dispatch(Creators.setLogging(false))
          resolve()
        },
        error: (user, error) => {
          dispatch(Creators.setError(error.message))
          dispatch(Creators.setLogging(false))
          reject()
        }
      })
    })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    console.log("Logging out")
    dispatch(Creators.setLogging(true))
    return Parse.User.logOut().then(() => {
      dispatch(Creators.setLogging(false))
      return
    })
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USERNAME]: username,
  [Types.SET_PASSWORD]: password,
  [Types.SET_PASSWORD_TWO]: password2,
  [Types.SET_EMAIL]: email,
  [Types.SET_TOKEN]: token,
  [Types.SET_LOGGING]: logging,
  [Types.SET_MISMATCH]: mismatch,
  [Types.SET_ERROR]: error
})
