import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateDevice: ['name']
})

export const SettingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  deviceName: "Blinky"
})

/* ------------- Reducers ------------- */

export const device = (state, { name }) =>
  state.merge({ deviceName: name })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_DEVICE]: device,
})
