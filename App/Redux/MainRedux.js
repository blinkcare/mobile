import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Parse from 'parse/react-native'

function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  console.log(ret)
  return ret;
}

let morseAlphabet = {
  "A": ".-",
  "B": "-...",
  "C": "-.-.",
  "D": "-..",
  "E": ".",
  "F": "..-.",
  "G": "--.",
  "H": "....",
  "I": "..",
  "J": ".---",
  "K": "-.-",
  "L": ".-..",
  "M": "--",
  "N": "-.",
  "O": "---",
  "P": ".--.",
  "Q": "--.-",
  "R": ".-.",
  "S": "...",
  "T": "-",
  "U": "..-",
  "V": "...-",
  "W": ".--",
  "X": "-..-",
  "Y": "-.--",
  "Z": "--..",
  " ": "....-",
  "/": "---...",
  "_": ".---."
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setChars: ['chars'],
  setStats: ['state'],
  setQueue: ['queue']
})

export const MainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  characters: "",
  stats: false,
  queue: "",
  morse: swap(morseAlphabet)
  })

/* ------------- Reducers ------------- */

export const setchar = (state, {chars}) =>
  state.merge({characters: chars})

export const setstate = (state, {stat}) =>
  state.merge({status: stat})

export const setq = (state, {queue}) =>
  state.merge({queue: queue})

/* ------------- Thunk Actions ------------- */

export const getQueue = (object) => {
  return (dispatch, getState) => {

    let queue = object.get("queue")
    console.log(queue)
    let started = object.get("started")
    dispatch(Creators.setStats(started))

    let chars = ""

    let individual = queue.split('|')

    if (started) {
      for (let i = 0; i < individual.length; i++) {
        if (!(individual[i] == "")) {
          if (individual[i] in getState().main.morse) {
            if (getState().main.morse[individual[i]] == '_') { // Check for backspace
              chars = chars.slice(0, -1);
            } else {
              chars += getState().main.morse[individual[i]]
            }
          }
        }
        if (queue[queue.length-1] == "|") {
          dispatch(Creators.setQueue(""))
        }
      }

      dispatch(Creators.setChars(chars))
    } else {
      dispatch(Creators.setChars(""))
    }
    dispatch(Creators.setQueue(individual[individual.length-1]))
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CHARS]: setchar,
  [Types.SET_STATS]: setstate,
  [Types.SET_QUEUE]: setq
})
