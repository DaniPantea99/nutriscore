import axios from 'axios';
import { RecipesURL } from '../api.js';

const loadRecipes = () => async (dispatch) => {
  const allRecipes = await axios.get(RecipesURL);
  dispatch({
    type: 'FETCH_RECIPES',
    payload: {
      allRecipes: allRecipes.data,
    },
  });
};

const createRecipe = (recipe) => async (dispatch) => {
  const createdRecipe = await axios.post(RecipesURL, recipe);
  dispatch({
    type: 'CREATE_RECIPE',
    payload: {
      allRecipes: createdRecipe.data,
    },
  });
  dispatch({
    type: 'FILTER_RECIPE',
    payload: {
      state: '',
    },
  });
};

const updateRecipe = (recipe) => async (dispatch) => {
  const updatedRecipe = await axios.put(`${RecipesURL}/${recipe._id}`, recipe)
  dispatch({
    type: 'UPDATE_RECIPE',
    payload: {
      recipe: updatedRecipe.data,
    },
  });
  dispatch({
    type: 'FILTER_RECIPE',
    payload: {
      state: '',
    },
  });
};

const removeRecipe = (recipe) => async (dispatch) => {
  const allRecipes = await axios.get(RecipesURL);
  const filtered = allRecipes.data.filter(
    (element) => element._id !== recipe._id
  );
  await axios.delete(RecipesURL + `/${recipe._id}`);
  dispatch({
    type: 'REMOVE_RECIPE',
    payload: {
      recipe: filtered,
    },
  });
  dispatch({
    type: 'FILTER_RECIPE',
    payload: {
      state: '',
    },
  });
};

export { loadRecipes, createRecipe, updateRecipe, removeRecipe };
