import * as actionTypes from './actionTypes';

export const changeLife = (change) => {
  return {
    type: actionTypes.CHANGE_LIFE,
    change
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