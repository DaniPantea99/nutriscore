const express = require('express');
const IngredientCtrl = require('../controllers/ingredients-ctrl');
const router = express.Router();

router.get('/', IngredientCtrl.getInfoConsIngredients);

module.exports = router;
