const express = require('express');
const router = express.Router();

const { addMovie } = require('../controllers/movie.controller');
const { loginValidation } = require('../validators/movie.validator')
const { validate } = require('../validators/common.validator')

router.post('/', validate, addMovie);
// router.get('/', moviesList);
// router.get('/genre/favourites', getFavouriteGenres);
// router.put('/genre/favourite', setFavouriteGeneres);
// router.get('/recommendations', getRecommendedMovies);
// router.put('/vote', voteMovie);
// router.put('/review', reviewMovie);


module.exports = router;
