import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const ENDPOINT = "https://blinkpennapps.localtunnel.me/"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startRequest: null,
  successRequest: ['current', 'waiting', 'status'],
  failedRequest: null,
})

export const MainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  current: "",
  waiting: "",
  error: false,
  status: false
})

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({})

export const success = (state, {current, waiting, status}) =>
  state.merge({current, waiting, status})

export const failure = (state) =>
  state.merge({error: true})


/* ----------------------- Thunk Actions ----------------------- */

export const send = () => {
  return (dispatch) => {
    dispatch(Creators.startRequest())

    const head = {
      method: 'GET',
      mode: 'cors'
    }

    return fetch(ENDPOINT, head)
      .then(res => res.json())
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
  [Types.START_REQUEST]: request,
  [Types.SUCCESS_REQUEST]: success,
  [Types.FAILED_REQUEST]: failure
})
