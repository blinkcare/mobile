import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import validUrl from 'valid-url'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setSession: ['token']
})

export const MainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  sessionToken: ""
})

/* ------------- Reducers ------------- */

export const token = (state, { token }) =>
  state.merge({sessionToken: token})


/* ----------------------- Thunk Actions ----------------------- */

export const send = () => {
  return (dispatch, getState) => {
    dispatch(Creators.startRequest())

    const head = {
      method: 'GET',
      mode: 'cors'
    }

    let endpoint = "http://blink.local/"

    if (validUrl.isWebUri(getState().settings.endpoint)) {
      endpoint = getState().settings.endpoint
    }

    console.log(endpoint)

    return fetch(endpoint, head)
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(res => {
        const { characters, queue, status } = res
        dispatch(Creators.successRequest(characters, queue, status))
      }).catch(e => {
        console.log(e)
        dispatch(Creators.failedRequest())
      })

  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SESSION]: token,
})
