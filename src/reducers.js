import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes';

export function field (state={
  color: 'white',
  settings: false
}, action) {
  switch (action.type) {
    case actionTypes.CHANGE_COLOR:
      return {
        ...state,
        color: action.color
      }
    case actionTypes.TOGGLE_SETTINGS:
      return {
        ...state,
        settings: !state.settings
      }
    default:
      return state
  }
}

export function tokens (state=[], action) {
  switch (action.type) {
    case actionTypes.ADD_TOKEN:
      return state.concat({
        ...action.token,
        id: Date.parse(new Date())
      });
    default:
      return state
  }
}

export function player (state={
  lifePoints: 20
}, action) {
  switch (action.type) {
    case actionTypes.CHANGE_LIFE:
      return {
        ...state,
        lifePoints: state.lifePoints + action.change
      };
    default:
      return state
  }
}


const rootReducer = combineReducers({
  field,
  tokens,
  player
})

export default rootReducer
