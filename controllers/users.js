const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// Index - GET /users (Community page)
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.render('users/index.ejs', { users: allUsers });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Show - GET /users/:userId (View other user's recipes)
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userRecipes = await Recipe.find({ owner: req.params.userId }).populate('ingredients');
    
    if (!user) {
      return res.redirect('/users');
    }
    
    res.render('users/show.ejs', { profileUser: user, recipes: userRecipes });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;