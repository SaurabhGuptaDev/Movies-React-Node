// controllers/movieController.js
const Movie = require('../models/Movie');

// Search movies using the OMDB API
const searchMovies = async (req, res) => {
  try {
    console.log(req.query);
    const { query } = req; // Corrected to access the 'query' parameter properly
    console.log(query);
    const apiKey = process.env.OMDB_API_KEY; // Use OMDB API key from environment variables
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${query.query}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
    console.log(data)
      res.json(data); // OMDB API returns movies under 'Search' key
    } else {
      res.status(404).json({ error: 'No movies found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Add a movie to the favorites list
const addFavorite = async (req, res) => {
  console.log(req.body)
  try {
    const { imdbID, Title, Country, Released,Poster } = req.body;
    const movie = new Movie({ movie_id:imdbID, title:Title, country:Country, release_date:Released , poster_path:Poster });
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Could not save favorite' });
  }
};

// Get all favorite movies
const getFavorites = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve favorites' });
  }
};

// Remove a movie from the favorites list
const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.json({ message: 'Favorite deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete favorite' });
  }
};

module.exports = {
  searchMovies,
  addFavorite,
  getFavorites,
  removeFavorite,
};
