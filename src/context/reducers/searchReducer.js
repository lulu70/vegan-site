export const searchInitialState = {
  filteredPosts: [],
  query: "",
  searchVisibility: false,
}

const types = {
  setPosts: "SET_POSTS",
  setQuery: "SET_QUERY",
  resetSearchState: "RESET_SEARCH_STATE",
  setSearchVisibility: "SET_SEARCH_VISIBILITY",
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
export const resetSearchState = dispatch => {
  dispatch({
    type: types.resetSearchState,
  })
}
export const setSearchVisibility = (dispatch, payload) => {
  dispatch({
    type: types.setSearchVisibility,
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
    case types.resetSearchState: {
      return {
        ...state,
        filteredPosts: [],
        query: "",
      }
    }
    case types.setSearchVisibility: {
      return {
        ...state,
        searchVisibility: payload,
      }
    }
    default: {
      return state
    }
  }
}
