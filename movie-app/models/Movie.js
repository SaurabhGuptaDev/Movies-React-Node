// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movie_id: { type: String, required: true },
  title: { type: String, required: true },
  overview: { type: String },
  release_date: { type: String },
  poster_path: { type: String },
  country:{type : String},
});

module.exports = mongoose.model('Movie', movieSchema);
