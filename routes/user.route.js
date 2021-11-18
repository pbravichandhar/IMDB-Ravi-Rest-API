const express = require('express');
const router = express.Router();

const { authenticate, register, getAllUsers} = require('../controllers/user.controller');
const { loginValidation, registerValidation } = require('../validators/user.validator')
const { validate } = require('../validators/common.validator')

router.post('/login', loginValidation(), validate, authenticate);
router.post('/register', registerValidation(), validate, register);

router.get('/all', getAllUsers);

module.exports = router;
