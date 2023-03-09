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
  const [selectedRecipe, setSelectedRecipe] = useState([])
  
  const handleRemoveRecipe = (recipe) => {
      const selected = filteredRecipes.find((el) => el._id === recipe._id);
      dispatch(removeRecipe(selected));
  }

  const viewRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe)
    setShowRecipePanel(true);
  };

  const CloseAndDiscard = (e) => {
    e.preventDefault()
    setSelectedRecipe([])
    setShowRecipePanel(false);
  }

  return (
    <div className="flex flex-col w-full h-full gap-4 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            width="100px"
            src={`./images/logo.png`}
            alt="restaurant-logo"
          />
          <h1 className="tracking-wide uppercase cursor-default">
            {t('recipeList.title')}
          </h1>
        </div>
        <img
          onClick={() => setShowModal(true)}
          className="w-[110px] mr-3 cursor-pointer hover:scale-105 transition-all duration-200"
          src={`./images/nutriscore/nutriscore.svg`}
          alt="nutriscore logo"
        />
        {showModal && <NutriScoreInfo showModal={showModal} onClose={setShowModal} />}
      </div>

      <div className="flex flex-col p-8 bg-white rounded-xl min-h-[500px] w-[500px] sm:w-full dark:text-gray-100 dark:bg-slate-800">
        <div className="flex flex-col justify-between mb-6 sm:flex-row">
          <div>
            <h2 className="tracking-wide">{t('recipeList.subtitle')}</h2>
          </div>
          <button
            className="px-6 py-3 font-semibold text-white bg-orange-500 rounded-2xl hover:bg-opacity-70 active:bg-opacity-100"
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
        leave="transition-opacity duration-200 ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`w-full lg:w-[500px]
        fixed h-full top-0 right-0 z-50 
        `}
        >
          {showRecipePanel &&
          <CreateRecipe
            recipe={selectedRecipe}
            onCloseAndDiscard={CloseAndDiscard}
          />
          }
        </div>
      </Transition>
    </div>
  );
}

export default Dashboard;
