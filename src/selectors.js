export const getTokenById = (tokensState, id) => {
  return tokensState.find((t) => t.id === id)
}
