export const searchInitialState = {
  filteredPosts: [],
  query: "",
}

const types = {
  setPosts: "SET_POSTS",
  setQuery: "SET_QUERY",
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
    default: {
      return state
    }
  }
}
