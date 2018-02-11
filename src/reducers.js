import { combineReducers } from 'redux'
import * as actionTypes from './actionTypes';
import { getTokenById } from './selectors'
import Session from './session'

const SESSION = new Session({
  persistent: true,
  key: 'mtg-field'
})

const DEFAULT_STORE = {
  field: {
    color: 'white',
    settings: false,
    editing: false
  },
  tokens: [],
  player: {
    lifePoints: 20
  }
}
const SAVED_STORE = SESSION.get('store')
console.log('SAVED STORE????', SAVED_STORE);
const INITIAL_STORE = SAVED_STORE || DEFAULT_STORE;


const updateSessionStore = (slice, store) => {
  const current = SESSION.get('store') || { ...DEFAULT_STORE };
  let updated = { ...current }
  updated[slice] = store
  SESSION.set('store', updated);
  console.log('add to ' + slice, updated);
  return store;
}

export function field (state=INITIAL_STORE.field, action) {
  switch (action.type) {
    case actionTypes.SAVE:
      return updateSessionStore('field', state);
    case actionTypes.RESET:
      return updateSessionStore('field', { ...DEFAULT_STORE.field });
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

export function tokens (state=INITIAL_STORE.tokens, action) {
  let token = (action.id) ? getTokenById(state, action.id) : null;
  switch (action.type) {
    case actionTypes.SAVE:
      return updateSessionStore('tokens', state);
      case actionTypes.RESET:
        return updateSessionStore('tokens', [...DEFAULT_STORE.tokens]);
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

export function player (state=INITIAL_STORE.player, action) {
  switch (action.type) {
    case actionTypes.SAVE:
      return updateSessionStore('player', state);
    case actionTypes.RESET:
      return updateSessionStore('player', { ...DEFAULT_STORE.player });
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
