const baseError = require('../_helpers/baseError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model')
const Movie = require('../models/movie.model')

module.exports = {
  createMovie: async (userDetails, movieParam) => {
    if (await Movie.findOne({ name: movieParam.name })) {
      throw new baseError('Already Movie created', 400, `Movie "${movieParam.name}" is already in the database`, true)
    }
    const movie = new Movie({ ...movieParam, createdBy: userDetails.id });
    return await movie.save();
  },
  getById: async (id) => {
    return await User.findById(id);
  },
};
