import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateEndpoint: ['text']
})

export const SettingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  endpoint: "https://blinkpennapps.localtunnel.me"
})

/* ------------- Reducers ------------- */

export const endpoint = (state, { text }) =>
  state.merge({ endpoint: text })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_ENDPOINT]: endpoint,
})
