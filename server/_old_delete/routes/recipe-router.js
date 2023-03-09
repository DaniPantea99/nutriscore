const express = require('express');
const RecipeCtrl = require('../controllers/recipe-ctrl');
const router = express.Router();

router.post('/', RecipeCtrl.createRecipe);
router.put('/:id', RecipeCtrl.updateRecipe);
router.delete('/:id', RecipeCtrl.deleteRecipe);
router.get('/:id', RecipeCtrl.getRecipeById);
router.get('/', RecipeCtrl.getRecipes);

module.exports = router;
