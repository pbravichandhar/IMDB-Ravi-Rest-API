const baseError = require('../_helpers/baseError');
const { authenticate, create} = require('../services/user.service');
const { createMovie } = require('../services/movie.service');
let { handleErrorAsync } = require('../_helpers/errorHandler');
const User = require('../models/user.model')

module.exports = {
  addMovie: handleErrorAsync(async (req, res, next) => {
    const data = await createMovie(req.userDetails, req.body)
    return res.send({
      message: 'Created successfully',
      data
    });
  }),

  register: handleErrorAsync(async (req, res, next) => {
    const data = await create(req.body)
    return res.send({
      message: 'Created successfully',
      data
    });
  }),

  getAllUsers: handleErrorAsync(async (req, res, next) => {
    const data = await User.find();
    return res.send({
      message: 'Fetched successfully',
      data
    }); 
  }),
};
