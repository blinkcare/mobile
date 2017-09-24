import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import validUrl from 'valid-url'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startRequest: null,
  successRequest: ['current', 'waiting', 'status'],
  failedRequest: null,
  setIp: ['ip']
})

export const MainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  current: "",
  waiting: "",
  error: true,
  status: false,
  ip: ""
})

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({})

export const success = (state, {current, waiting, status}) =>
  state.merge({current, waiting, status, error: false})

export const failure = (state) =>
  state.merge({error: true})

export const ip = (state, { i }) =>
  state.merge({ip: i})


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
  [Types.START_REQUEST]: request,
  [Types.SUCCESS_REQUEST]: success,
  [Types.FAILED_REQUEST]: failure,
  [Types.SET_IP]: ip
})
