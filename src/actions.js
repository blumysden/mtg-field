import * as actionTypes from './actionTypes';

export const save = () => {
  return { type: actionTypes.SAVE }
}

export const reset = () => {
  return { type: actionTypes.RESET }
}

export const changeLife = (change) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.CHANGE_LIFE,
      change
    })
    dispatch(save())
  }
}

export const changeColor = (color) => {
  return {
    type: actionTypes.CHANGE_COLOR,
    color
  }
}

export const toggleSettings = () => {
  return {
    type: actionTypes.TOGGLE_SETTINGS
  }
}

export const addToken = (token) => {
  return {
    type: actionTypes.ADD_TOKEN,
    token
  }
}

export const editToken = (id, token) => {
  return {
    type: actionTypes.EDIT_TOKEN,
    id,
    token
  }
}

export const setEditingToken = (id) => {
  return {
    type: actionTypes.SET_EDITING_TOKEN,
    id
  }
}

export const closeTokenEditor = () => {
  return { type: actionTypes.CLOSE_TOKEN_EDITOR }
}
