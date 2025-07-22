const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

// Index - GET /recipes
router.get('/', async (req, res) => {
  try {
    const userRecipes = await Recipe.find({ owner: req.session.user._id }).populate('ingredients');
    res.render('recipes/index.ejs', { recipes: userRecipes });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// New - GET /recipes/new
router.get('/new', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render('recipes/new.ejs', { ingredients });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Create - POST /recipes
router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id;
    await newRecipe.save();
    res.redirect('/recipes');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Show - GET /recipes/:recipeId
router.get('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients');
    if (!recipe.owner.equals(req.session.user._id)) {
      return res.redirect('/recipes');
    }
    res.render('recipes/show.ejs', { recipe });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Edit - GET /recipes/:recipeId/edit
router.get('/:recipeId/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients');
    const ingredients = await Ingredient.find({});
    if (!recipe.owner.equals(req.session.user._id)) {
      return res.redirect('/recipes');
    }
    res.render('recipes/edit.ejs', { recipe, ingredients });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Update - PUT /recipes/:recipeId
router.put('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe.owner.equals(req.session.user._id)) {
      return res.redirect('/recipes');
    }
    
    await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
    res.redirect(`/recipes/${req.params.recipeId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Delete - DELETE /recipes/:recipeId
router.delete('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe.owner.equals(req.session.user._id)) {
      return res.redirect('/recipes');
    }
    
    await Recipe.deleteOne({ _id: req.params.recipeId });
    res.redirect('/recipes');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;