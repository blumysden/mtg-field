import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes';
import { getTokenById } from './selectors'

export function field (state={
  color: 'white',
  settings: false,
  editing: false
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
    case actionTypes.SET_EDITING_TOKEN:
      return {
        ...state,
        editing: action.id
      }
    case actionTypes.CLOSE_TOKEN_EDITOR:
      return {
        ...state,
        editing: false
      }
    default:
      return state
  }
}

export function tokens (state=[], action) {
  let token = (action.id) ? getTokenById(state, action.id) : null;
  switch (action.type) {
    case actionTypes.ADD_TOKEN:
      return state.concat({
        ...action.token,
        id: Date.parse(new Date())
      });
      case actionTypes.EDIT_TOKEN:
        return state.map((t) => {
          if (t.id == action.id) {
            return { ...action.token, id: action.id }
          } else {
            return { ...t }
          }
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
