const baseError = require('../_helpers/baseError');
const { authenticate, create } = require('../services/user.service');
const { createMovie } = require('../services/movie.service');
let { handleErrorAsync } = require('../_helpers/errorHandler');
const User = require('../models/user.model')
const Movie = require('../models/movie.model')

module.exports = {
  addMovie: handleErrorAsync(async (req, res, next) => {
    const data = await createMovie(req.userDetails, req.body)
    return res.send({
      message: 'Created successfully',
      data
    });
  }),

  setFavouriteGeneres: handleErrorAsync(async (req, res, next) => {
    let userData = await User.findOne({ _id: req.userDetails.id, favoriteGenre: req.body.genre });
    if (!userData) {
      userData = await User.findOneAndUpdate({ _id: req.userDetails.id }, { '$push': { 'favoriteGenre': req.body.genre } }, { returnOriginal: false })
    }
    return res.send({
      message: 'Updated successfully',
      data: userData
    });
  }),

  getRecommendedMovies: handleErrorAsync(async (req, res, next) => {
    let recommendedMovies = await Movie.find({ genre: { '$in': [...req.userDetails.favoriteGenre] } });
    return res.send({
      message: 'Recommended Movies fetched successfully',
      data: recommendedMovies
    });
  }),

  voteMovie: handleErrorAsync(async (req, res, next) => {
    let movieData = await Movie.findOneAndUpdate(
      { '_id': req.query.movieId, votes: { $elemMatch: { votedBy: req.userDetails.id } } },
      { '$set': { votes: { votedBy: req.userDetails.id, isUpVote: req.body.isUpVote } } },
      { new: true }
    );
    if (!movieData) {
      movieData = await Movie.findOneAndUpdate(
        { '_id': req.query.movieId },
        { '$push': { votes: { votedBy: req.userDetails.id, isUpVote: req.body.isUpVote } } },
        { new: true }
      )
    }
    return res.send({
      message: 'Voted successfully',
      data: movieData
    });
  }),

  reviewMovie: handleErrorAsync(async (req, res, next) => {
    let movieData = await Movie.findOneAndUpdate(
      { '_id': req.query.movieId, reviews: { $elemMatch: { reviewBy: req.userDetails.id } } },
      { '$set': { reviews: { reviewBy: req.userDetails.id, rating: req.body.rating, comments: req.body.comments || '' } } },
      { new: true }
    );
    if (!movieData) {
      movieData = await Movie.findOneAndUpdate(
        { '_id': req.query.movieId },
        { '$push': { reviews: { reviewBy: req.userDetails.id, rating: req.body.rating, comments: req.body.comments || '' } } },
        { new: true }
      )
    }
    return res.send({
      message: 'Reviewed successfully',
      data: movieData
    });
  }),

  getMovieById: handleErrorAsync(async (req, res, next) => {
    const data = await Movie.find({ _id: req.params.movieId});
    return res.send({
      message: 'Movie details successfully fetched',
      data
    });
  }),

  getAllMovies: handleErrorAsync(async (req, res, next) => {
    const data = await Movie.find();
    return res.send({
      message: 'Fetched successfully',
      data
    });
  }),
};
