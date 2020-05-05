export const pantryInitialState = {
  filterInput: "",
  filteredIngredients: [],
  filteredRecipes: [],
  selectedIngredients: [],
}

const types = {
  test: "TEST",
}

export const test = (dispatch, payload) => {
  dispatch({
    type: types.test,
    payload,
  })
}

export const pantryReducer = (state, { type, payload }) => {
  switch (type) {
    case types.test: {
      return {
        ...state,
        test: payload,
      }
    }
    default: {
      return state
    }
  }
}
