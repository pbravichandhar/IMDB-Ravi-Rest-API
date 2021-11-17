const baseError = require('../_helpers/baseError');
const { authenticate, create} = require('../services/user.service');
let { handleErrorAsync } = require('../_helpers/errorHandler');
const User = require('../models/user.model')

module.exports = {
  authenticate: handleErrorAsync(async (req, res, next) => {
    const user = await authenticate(req.body);
    if (!user) {
      throw new baseError('No User', 400, 'Username or password is incorrect', false)
    }
    return res.send({
      message: 'Success',
      data: { user }
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
