import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  recipes: recipesReducer,
});

export default rootReducer;
