const baseError = require('../_helpers/baseError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model')

module.exports = {
  authenticate: async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
      const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET , { expiresIn: '7d' });
      return {
        ...user.toJSON(),
        token
      };
    } else {
      throw new baseError('No User', 400, 'User not found!', true)
    }
  },
  create: async (userParam) => {
    if (await User.findOne({ username: userParam.username })) {
      throw new baseError('Already Registerd', 400, `Username ${userParam.username} is already taken`, true)
    }
    const user = new User(userParam);
    // hash password
    if (userParam.password) {
      user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    return await user.save();
  },
  getById: async (id) => {
    return await User.findById(id);
  },
};
