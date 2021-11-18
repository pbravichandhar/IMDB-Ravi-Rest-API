const { body } = require('express-validator')

const loginValidation = () => {
    return [
        body('username').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
        body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    ]
}

const registerValidation = () => {
    return [
        body('username').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
        body('firstName').not().isEmpty().trim().escape().withMessage('must not be empty'),
        body('lastName').not().isEmpty().trim().escape().withMessage('must not be empty'),
        body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
    ]
}

module.exports = {
    registerValidation,
    loginValidation,
}