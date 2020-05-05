export const pantryInitialState = {
  filterInput: "",
  ingredients: [],
  filteredIngredients: [],
  filteredRecipes: [],
  selectedIngredients: [],
}

const types = {
  setIngredients: "SET_INGREDIENTS",
  setFilteredIngredients: "SET_FILTERED_INGREDIENTS",
  setFilterInput: "SET_FILTER_INPUT",
  setSelectedIngredients: "SET_SELECTED_INGREDIENTS",
  setFilteredRecipes: "SET_FILTERED_RECIPES",
}

export const setIngredients = (dispatch, payload) => {
  dispatch({
    type: types.setIngredients,
    payload,
  })
}
export const setFilteredIngredients = (dispatch, payload) => {
  dispatch({
    type: types.setFilteredIngredients,
    payload,
  })
}
export const setFilterInput = (dispatch, payload) => {
  dispatch({
    type: types.setFilterInput,
    payload,
  })
}
export const setSelectedIngredients = (dispatch, payload) => {
  dispatch({
    type: types.setSelectedIngredients,
    payload,
  })
}
export const setFilteredRecipes = (dispatch, payload) => {
  dispatch({
    type: types.setFilteredRecipes,
    payload,
  })
}

export const pantryReducer = (state, { type, payload }) => {
  switch (type) {
    case types.setIngredients: {
      return {
        ...state,
        ingredients: payload,
      }
    }

    case types.setFilteredIngredients: {
      return {
        ...state,
        filteredIngredients: payload,
      }
    }
    case types.setFilterInput: {
      return {
        ...state,
        filterInput: payload,
      }
    }
    case types.setSelectedIngredients: {
      return {
        ...state,
        selectedIngredients: payload,
      }
    }
    case types.setFilteredRecipes: {
      return {
        ...state,
        filteredRecipes: payload,
      }
    }

    default: {
      return state
    }
  }
}
