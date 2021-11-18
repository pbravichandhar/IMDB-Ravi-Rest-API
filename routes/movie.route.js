const express = require('express');
const router = express.Router();

const { addMovie, setFavouriteGeneres, getRecommendedMovies, voteMovie, reviewMovie, getMovieById, getAllMovies} = require('../controllers/movie.controller');
const { createMovieValidation, getMovieByIdValidation, setFavouriteValidation, voteMovieValidation, reviewMovieValidation, getAllMoviesValidation} = require('../validators/movie.validator')
const { validate } = require('../validators/common.validator')

router.get('/recommendations', getRecommendedMovies);
router.post('/', createMovieValidation(), validate, addMovie);
router.get('/all', getAllMoviesValidation(), validate, getAllMovies);
router.get('/:movieId', getMovieByIdValidation(), validate, getMovieById);
router.put('/genre/favourite', setFavouriteValidation(), validate, setFavouriteGeneres);
router.put('/vote', voteMovieValidation(), validate, voteMovie);
router.put('/review', reviewMovieValidation(), validate, reviewMovie);

module.exports = router;
