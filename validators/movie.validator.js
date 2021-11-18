const { body, check} = require('express-validator')
const { genres } = require('../_helpers/constants');



const createMovieValidation = () => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let cA = new Date(year - 18, month, day).toDateString();
    let cB = new Date(year - 65, month, day).toDateString();
    return [
        sanitizeBody(
            ['genre', 'name', 'releaseDate']
        ).trim(),
        check('genre')
            .isIn(constants.genres).withMessage(`must be in following list ${constants.genres}`),
        body('name').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
        body('releaseDate').isDate().isBefore(cA).isAfter(cB).withMessage(`must be valid date and it should be greater then today's date`),
    ]
}

module.exports = {
    createMovieValidation,
}