// routes/movieRoutes.js
const express = require('express');
const {
  searchMovies,
  addFavorite,
  getFavorites,
  removeFavorite,
} = require('../controllers/movieController');

const router = express.Router();

router.get('/search', searchMovies);
router.post('/favorites', addFavorite);
router.get('/favorites', getFavorites);
router.delete('/favorites/:id', removeFavorite);

module.exports = router;
