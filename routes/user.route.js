const express = require('express');
const router = express.Router();

const { authenticate, register, getAllUsers} = require('../controllers/user.controller');

router.post('/login', authenticate);
router.post('/register', register);
router.get('/all', getAllUsers);

module.exports = router;
