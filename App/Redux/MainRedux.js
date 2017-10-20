import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Parse from 'parse/react-native'

function swap(json) {
  var ret = {}
  for (var key in json) {
    ret[json[key]] = key
  }
  return ret
}

let morseAlphabet = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  ' ': '....-',
  '/': '---...',
  _: '.---.'
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setChars: ['device', 'chars'],
  setStats: ['device', 'stat'],
  setQueue: ['device', 'queue']
})

export const MainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  morse: swap(morseAlphabet),
  totalObj: {}
})

/* ------------- Reducers ------------- */

export const setchar = (state, { device, chars }) => {
  let s = {totalObj: {}}
  s.totalObj[device] = {characters: chars}
  return state.merge(s, {deep: true})
}

export const setstat = (state, { device, stat }) => {
  let s = {totalObj: {}}
  s.totalObj[device] = {stat}
  return state.merge(s, {deep: true})
}

export const setq = (state, { device, queue }) => {
  let s = {totalObj: {}}
  s.totalObj[device] = {queue}
  return state.merge(s, {deep: true})
}


/* ------------- Thunk Actions ------------- */

export const getQueue = object => {
  return (dispatch, getState) => {
    let device = object.get('deviceName')
    let queue = object.get('queue')
    let started = object.get('started')

    dispatch(Creators.setStats(device, started))

    let chars = ''

    let individual = queue.split('|')

    if (started) {
      for (let i = 0; i < individual.length; i++) {
        if (!(individual[i] == '')) {
          if (individual[i] in getState().main.morse) {
            if (getState().main.morse[individual[i]] == '_') {
              // Check for backspace
              chars = chars.slice(0, -1)
            } else {
              chars += getState().main.morse[individual[i]]
            }
          }
        }
        if (queue[queue.length - 1] == '|') {
          dispatch(Creators.setQueue(device, ''))
        }
      }

      dispatch(Creators.setChars(device, chars))
    } else {
      dispatch(Creators.setChars(device, ''))
    }
    dispatch(Creators.setQueue(device, individual[individual.length - 1]))
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CHARS]: setchar,
  [Types.SET_STATS]: setstat,
  [Types.SET_QUEUE]: setq
})
