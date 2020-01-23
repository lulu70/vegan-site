export const searchInitialState = {
  filteredPosts: [],
  query: "",
}

const types = {
  setPosts: "SET_POSTS",
  setQuery: "SET_QUERY",
  resetState: "RESET_STATE",
}

export const setPosts = (dispatch, payload) => {
  dispatch({
    type: types.setPosts,
    payload,
  })
}
export const setQuery = (dispatch, payload) => {
  dispatch({
    type: types.setQuery,
    payload,
  })
}
export const resetState = dispatch => {
  dispatch({
    type: types.resetState,
  })
}

export const searchReducer = (state, { type, payload }) => {
  switch (type) {
    case types.setPosts: {
      return {
        ...state,
        filteredPosts: payload,
      }
    }
    case types.setQuery: {
      return {
        ...state,
        query: payload,
      }
    }
    case types.resetState: {
      return searchInitialState
    }
    default: {
      return state
    }
  }
}
