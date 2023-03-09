import React from 'react';
import Ingredient from '../components/Ingredient';
import { useTranslation } from 'react-i18next';

function ListOfIngredients({ recipe, updateIngredient, removeIngredient }) {
  const { t } = useTranslation();
  return (
    <div>
      {recipe.ingredients?.length > 0 && (
        <h3>{t('editRecipe.ingredientsList')}</h3>
      )}

      {recipe.ingredients?.length > 0 && (
        <div className="flex flex-col gap-2 mb-6">
          {recipe?.ingredients.map((item, index) => (
            <Ingredient
              item={item}
              key={index}
              onChange={updateIngredient}
              onRemove={removeIngredient}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListOfIngredients;
