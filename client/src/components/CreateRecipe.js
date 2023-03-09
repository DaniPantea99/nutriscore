import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe, updateRecipe } from '../actions/recipesAction';
import { BsFillXCircleFill } from 'react-icons/bs';
import { nutriScore } from 'nutri-score';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { format2Decimals } from '../utility';
import { RecipeDetails } from './RecipeDetails';
import ListOfIngredients from './ListOfIngredients';
import AutoComplete from './AutoComplete';
// import { NavLink } from 'react-router-dom';
// import SearchIngredient from './SearchIngredient';

const initialState = {
  recipe: {
    _id: '',
    name: '',
    quantity: null,
    date: '',
    ingredients: [],
    nutriments: {
      calories: 0,
      fat: 0,
      saturated_fat: 0,
      carbohydrates: 0,
      sugars: 0,
      proteins: 0,
      salt: 0,
    },
    additives: [],
    nutriscore: null,
  },
};

function CreateRecipe({ onCloseAndDiscard, recipe }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('ro-RO', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  const [state, setState] = useState(recipe._id ? { recipe } : initialState);

  const formHandler = (formData) => {
    setState({
      recipe: {
        ...state.recipe,
        ...formData,
      },
    });
  };

  const addNewIngredient = (ingredient) => {
    let uuid = uuidv4();
    const newIngredient = {
      id: uuid,
      productName: ingredient.product_name,
      brand: ingredient.brands,
      quantity: null,
      calories_100: ingredient.calories,
      calories_currQty: null,
      nutriments: ingredient.nutriments
        ? Array.isArray(ingredient.nutriments)
          ? ingredient.nutriments
          : Object.values(ingredient.nutriments)
        : [],
      additives: ingredient.additives_tags,
      source: ingredient.sursa,
    };
    setState({
      recipe: {
        ...state.recipe,
        ingredients: [...state.recipe.ingredients, newIngredient],
      },
    });
  };

  const removeIngredient = (ingredient) => {
    const filteredList = state.recipe.ingredients.filter(
      (el) => el.id !== ingredient.id
    );
    const updatedQuantity = filteredList.reduce(
      (acc, curr) => acc + curr.quantity ?? 0,
      0
    );
    setState({
      recipe: {
        ...state.recipe,
        quantity: updatedQuantity,
        ingredients: [...filteredList],
        ...calculateRecipeDetails(filteredList, updatedQuantity),
      },
    });
  };

  const updateIngredient = (value, ingredient) => {
    const updatedIngredients = state.recipe.ingredients.map((item) => {
      if (item.id === ingredient.id) {
        let nutriments = [];
        if (ingredient.productName.toLowerCase().includes('sare')) {
          nutriments = [
            {
              name: 'salt',
              quantity_current: +value ?? 0,
            },
          ];
        } else if (item.nutriments.length) {
          nutriments = item.nutriments?.map((el) => ({
            ...el,
            quantity_current: format2Decimals(
              (+el.quantity_100 / 100) * +value
            ),
          }));
        }
        return {
          ...item,
          quantity: +value,
          calories_currQty:
            format2Decimals(
              ((item.calories_100 ? +item.calories_100 : 0) / 100) * +value
            ) ?? 0,
          nutriments: nutriments,
        };
      }
      return item;
    });
    const updatedQuantity = updatedIngredients.reduce(
      (acc, curr) => acc + curr.quantity ?? 0,
      0
    );
    formHandler({
      ...state.recipe,
      quantity: updatedQuantity,
      ingredients: [...updatedIngredients],
      ...calculateRecipeDetails(updatedIngredients, updatedQuantity),
    });
  };

  const calculateRecipeDetails = (ingredients, recipeQuantity) => {
    const _ingredients = ingredients ? ingredients : state.recipe.ingredients;
    return {
      date: formattedDate,
      nutriments: {
        calories: format2Decimals(
          (_ingredients.reduce(
            (acc, curr) => acc + (curr?.calories_currQty ?? 0),
            0
          ) *
            100) /
            +recipeQuantity
        ),
        fat: format2Decimals(
          (calculateQty(_ingredients, 'fat') * 100) / +recipeQuantity
        ),
        saturated_fat: format2Decimals(
          (calculateQty(_ingredients, 'saturated-fat') * 100) / +recipeQuantity
        ),
        carbohydrates: format2Decimals(
          (calculateQty(_ingredients, 'carbohydrates') * 100) / +recipeQuantity
        ),
        sugars: format2Decimals(
          (calculateQty(_ingredients, 'sugars') * 100) / +recipeQuantity
        ),
        proteins: format2Decimals(
          (calculateQty(_ingredients, 'proteins') * 100) / +recipeQuantity
        ),
        salt: format2Decimals(
          (calculateQty(_ingredients, 'salt') * 100) / +recipeQuantity
        ),
      },
      additives: _ingredients.length ? calculateAdditives(_ingredients) : [],
      nutriscore: _ingredients.length
        ? nutriScore.calculateClass({
            energy: format2Decimals(
              calculateQty(_ingredients, 'energy-kcal') * 4.184
            ),
            fibers: format2Decimals(calculateQty(_ingredients, 'fibers') ?? 0),
            fruit_percentage: 0,
            proteins: format2Decimals(calculateQty(_ingredients, 'proteins')),
            saturated_fats: format2Decimals(
              calculateQty(_ingredients, 'saturated-fat')
            ),
            sodium: format2Decimals(calculateQty(_ingredients, 'salt') * 400),
            sugar: format2Decimals(calculateQty(_ingredients, 'sugars')),
          })
        : null,
      nutriscore_TEMP: {
        energy: format2Decimals(
          calculateQty(_ingredients, 'energy-kcal') * 4.184
        ),
        fibers: format2Decimals(calculateQty(_ingredients, 'fibers') ?? 0),
        fruit_percentage: 0,
        proteins: format2Decimals(calculateQty(_ingredients, 'proteins')),
        saturated_fats: format2Decimals(
          calculateQty(_ingredients, 'saturated-fat')
        ),
        sodium: format2Decimals(calculateQty(_ingredients, 'salt') * 400),
        sugar: format2Decimals(calculateQty(_ingredients, 'sugars')),
      },
    };
  };

  const calculateAdditives = (ingredients) => {
    const _ingredients = ingredients ? ingredients : state.recipe.ingredients;
    const additivesList = [];
    _ingredients
      .filter((el) => el.additives)
      .map((item) =>
        item.additives.map((elem) =>
          additivesList.push(elem.toString().slice(3) + ' ')
        )
      );
    return Array.from(new Set(additivesList));
  };

  const calculateQty = (ingredients, nutrimentName = '') => {
    const _ingredients = ingredients ? ingredients : state.recipe.ingredients;
    return _ingredients
      .filter((item) => item.nutriments)
      .map((element) => {
        if (!Array.isArray(element.nutriments)) {
          return Object.values(element.nutriments);
        }
        return element.nutriments;
      })
      .reduce((acc, curr) => {
        return (
          acc +
            (curr?.find((nutriment) => nutriment.name === nutrimentName)
              ?.quantity_current ?? 0) ?? 0
        );
      }, 0);
  };

  const showNutriScore = () => {
    const score = state.recipe.nutriscore;
    if (!score) {
      return (
        <img
          width="100px"
          src={`./images/nutriscore/nutriscore.svg`}
          alt={`logo-nutriscore`}
        />
      );
    }
    return (
      <img
        width="100px"
        src={`./images/nutriscore/nutriscore_${score.toLowerCase()}.svg`}
        alt={`logo-nutriscore-${score.toLowerCase()}`}
      />
    );
  };

  const createNewRecipe = (e) => {
    e.preventDefault();
    if (state.recipe.ingredients.length === 0) {
      alert(t('editRecipe.noIngredientsAlert'));
    } else if (state.recipe._id) {
      dispatch(updateRecipe(state.recipe));
      onCloseAndDiscard(e);
    } else {
      dispatch(createRecipe(state.recipe));
      onCloseAndDiscard(e);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 text-gray-900 bg-gray-100 shadow-2xl md:px-7">
      {/* <NavLink to={'/pdf'}>Print</NavLink> */}
      <button onClick={() => console.log(state.recipe)}>TEST recipe</button>
      <div className="flex justify-between gap-3">
        <h2 className="text-base font-semibold">
          {t('editRecipe.description')}
        </h2>
        <BsFillXCircleFill
          onClick={onCloseAndDiscard}
          className="text-4xl text-blue-900 cursor-pointer blue-900 hover:text-opacity-70 active:text-opacity-100"
        />
      </div>

      <form
        action="submit"
        onSubmit={createNewRecipe}
        className="flex flex-col h-full p-1 mt-8 overflow-hidden grow"
      >
        <div className="px-1 overflow-auto grow">
          <div className="header">
            <label
              htmlFor="recipe-name"
              className="block mb-1 ml-2 font-semibold tracking-wider text-gray-900 uppercase"
            >
              {t('editRecipe.firstLabel')}
            </label>
            <input
              required
              defaultValue={state.recipe.name}
              className="w-full h-12 p-3 mb-6 text-base bg-white recipe-name rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder={t('editRecipe.placeholder')}
              type="text"
              id="recipe-name"
              name="recipe-name"
              onChange={(e) => formHandler({ name: e.target.value })}
            />

            <label
              htmlFor="search-ingredients"
              className="block mb-1 ml-2 font-semibold tracking-wider text-gray-900 uppercase"
            >
              {t('editRecipe.secondLabel')}
            </label>
            {/* <SearchIngredient onAddNewIngredient={addNewIngredient} /> */}
            <AutoComplete onAddNewIngredient={addNewIngredient} />
          </div>

          <div className="flex flex-col mt-6 rounded-xl min-w-fit">
            <ListOfIngredients
              recipe={state.recipe}
              updateIngredient={updateIngredient}
              removeIngredient={removeIngredient}
            />
            <RecipeDetails recipe={state.recipe} />
          </div>

          <div className="my-4">{showNutriScore()}</div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 font-medium tracking-widest text-white bg-orange-500 rounded-2xl hover:bg-opacity-70 active:bg-opacity-100"
          >
            {recipe._id
              ? t('editRecipe.updateButton')
              : t('createRecipe.saveBtn')}
          </button>
          <button
            className="px-4 py-2 font-medium tracking-widest bg-blue-300 rounded-2xl hover:bg-opacity-70 active:bg-opacity-100"
            onClick={onCloseAndDiscard}
          >
            {recipe._id
              ? t('editRecipe.discardButton')
              : t('createRecipe.discardBtn')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;
