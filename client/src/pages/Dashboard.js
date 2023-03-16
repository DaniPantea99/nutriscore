import React, { useState, Fragment } from 'react';
import CreateRecipe from '../components/CreateRecipe';
import { Transition } from '@headlessui/react';
import RecipesTable from '../components/RecipesTable';
import { removeRecipe } from '../actions/recipesAction';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NutriScoreInfo from '../components/NutriScoreInfo';

function Dashboard() {
  const { filteredRecipes } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showRecipePanel, setShowRecipePanel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState([]);

  const handleRemoveRecipe = (recipe) => {
    const selected = filteredRecipes.find((el) => el._id === recipe._id);
    dispatch(removeRecipe(selected));
  };

  const viewRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipePanel(true);
  };

  const CloseAndDiscard = (e) => {
    e.preventDefault();
    setSelectedRecipe([]);
    setShowRecipePanel(false);
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4 sm:p-8">
      <div className="flex flex-col gap-4 sm:justify-between sm:items-center sm:flex-row">
        <div className="flex items-center gap-4">
          <img
            className="w-[80px] sm:w-[100px]"
            src={`./images/logo.png`}
            alt="restaurant-logo"
          />
          <h1 className="text-2xl tracking-wide uppercase cursor-default sm:text-3xl">
            {t('recipeList.title')}
          </h1>
        </div>
        <img
          onClick={() => setShowModal(true)}
          className="w-[110px] cursor-pointer hover:scale-105 transition-all duration-200 place-self-end sm:self-auto"
          src={`./images/nutriscore/nutriscore.svg`}
          alt="nutriscore logo"
        />
        {showModal && (
          <NutriScoreInfo showModal={showModal} onClose={setShowModal} />
        )}
      </div>

      <div className="flex flex-col p-4 bg-white sm:p-6 rounded-xl dark:text-gray-100 dark:bg-slate-800">
        <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row">
          <div>
            <h2 className="tracking-wide">{t('recipeList.subtitle')}</h2>
          </div>
          <button
            className="px-6 py-3 font-semibold text-white bg-orange-500 rounded-2xl hover:brightness-110 active:brightness-95"
            onClick={() => setShowRecipePanel(true)}
          >
            {t('recipeList.createButton')}
          </button>
        </div>

        <RecipesTable
          onSelect={viewRecipeDetails}
          onRemoveRecipe={handleRemoveRecipe}
        />
      </div>

      <Transition
        as={Fragment}
        show={showRecipePanel}
        enter="transition-opacity duration-500 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500 ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={CloseAndDiscard}
          />

          <div
            className={`w-full lg:w-[500px]
              fixed h-full top-0 right-0 
              `}
          >
            <CreateRecipe
              recipe={selectedRecipe}
              onCloseAndDiscard={CloseAndDiscard}
            />
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default Dashboard;
