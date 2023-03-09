import axios from 'axios';
import { InfoConsIngredientsURL } from '../api.js';

const loadIngredients = () => async (dispatch) => {
  const allIngredients = await axios.get(InfoConsIngredientsURL);
  dispatch({
    type: 'FETCH_INGREDIENTS',
    payload: {
      all: allIngredients.data.data,
    },
  });
};

export { loadIngredients };
